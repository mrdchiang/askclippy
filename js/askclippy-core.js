(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AskClippyCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function normalizeCveId(value) {
    return String(value || '').trim().toUpperCase();
  }

  function parseCSVRecords(text, maxRecords) {
    const records = [];
    let record = [];
    let field = '';
    let quoted = false;
    const limit = Number.isFinite(maxRecords) && maxRecords > 0 ? maxRecords : Infinity;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (quoted) {
        if (char === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            quoted = false;
          }
        } else {
          field += char;
        }
      } else if (char === '"') {
        quoted = true;
      } else if (char === ',') {
        record.push(field);
        field = '';
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && text[i + 1] === '\n') i++;
        record.push(field);
        field = '';
        if (record.some(value => value.trim() !== '')) records.push(record);
        record = [];
        if (records.length >= limit) break;
      } else {
        field += char;
      }
    }

    if (quoted) throw new Error('Unclosed quoted field');
    if (field || record.length) {
      record.push(field);
      if (record.some(value => value.trim() !== '')) records.push(record);
    }
    return records;
  }

  function captureSection(lines, startLabel, endLabel) {
    let capturing = false;
    const captured = [];
    for (const line of lines) {
      if (line.startsWith('## ') && line.includes(startLabel)) {
        capturing = true;
        continue;
      }
      if (capturing && endLabel && line.startsWith('## ') && line.includes(endLabel)) break;
      if (capturing && line.startsWith('- ')) captured.push(line);
    }
    return captured.length > 0 ? captured : null;
  }

  function filterSuiteRecords(records, validator) {
    if (!Array.isArray(records)) return { validRecords: [], rejected: 0 };
    if (typeof validator !== 'function') return { validRecords: records.slice(), rejected: 0 };

    const validRecords = [];
    let rejected = 0;
    for (const record of records) {
      const result = validator(record);
      if (result && result.valid) validRecords.push(record);
      else rejected++;
    }
    return { validRecords, rejected };
  }

  function parseStructuredQuery(question) {
    const q = String(question || '').toLowerCase();
    let filterSpec = null;

    if (q.includes('kev') && (q.includes('deployed') || q.includes('not yet verified'))) {
      filterSpec = { entity: 'findings', kev: true, deployed: true, unverified: true, limit: 50 };
    } else if (q.includes('remediation rate') || q.includes('across all teams')) {
      filterSpec = { entity: 'remediations', aggregate: 'rate', limit: 100 };
    } else if (q.includes('eol') && q.includes('critical cve')) {
      filterSpec = { entity: 'assets', eol: true, has_critical_cve: true, limit: 50 };
    } else if (q.includes('cve') || q.includes('vulnerability') || q.includes('finding')) {
      filterSpec = { entity: 'findings', limit: 50 };
      if (q.includes('critical')) filterSpec.severity = ['Critical'];
      else if (q.includes('high')) filterSpec.severity = ['High'];
      if (q.includes('kev') || q.includes('exploit')) filterSpec.kev = true;
      if (q.includes('active')) filterSpec.state = ['Active'];
      if (q.includes('fixed')) filterSpec.state = ['Fixed'];
      const cveMatch = q.match(/cve[-\s]*(\d{4}[-\s]*\d{4,})/i);
      if (cveMatch) filterSpec.cve = 'CVE-' + cveMatch[1].replace(/[-\s]+/g, '-');
    } else if (q.includes('asset') || q.includes('host') || q.includes('server') || q.includes('endpoint')) {
      filterSpec = { entity: 'assets', limit: 50 };
      if (q.includes('eol')) filterSpec.eol = true;
      if (q.includes('unhealthy') || q.includes('poor health')) filterSpec.health = 'critical';
    } else if (q.includes('remediation') || q.includes('deploy') || q.includes('queue') || q.includes('pending')) {
      filterSpec = { entity: 'remediations', limit: 50 };
      if (q.includes('pending')) filterSpec.state = ['pending'];
      if (q.includes('deployed')) filterSpec.state = ['deployed'];
      if (q.includes('verified')) filterSpec.state = ['verified'];
    }

    return filterSpec;
  }

  function classifyClippyReaction(answer, question) {
    const a = String(answer || '').toLowerCase();
    const q = String(question || '').toLowerCase();

    if (a.includes('couldn') || a.includes('error') || a.includes('no match') || a.includes('not found')) {
      return 'error';
    }

    const queueIntent = q.includes('remediate') || q.includes('fix ') ||
      q.includes('queue remediation') || q.includes('deploy fix');
    if (queueIntent && a.includes('queued')) return 'queued';

    if (a.includes('critical') || a.includes('kev') || a.includes('exploit') || a.includes('unhealthy')) {
      return 'critical';
    }
    if (a.includes('compliant') || a.includes('healthy') || a.includes('pass') || a.includes('✅') || a.includes('good')) {
      return 'good';
    }
    if (a.includes('pipeline') || a.includes('pending') || a.includes('verified') || a.includes('remediation')) {
      return 'pipeline';
    }
    return 'default';
  }

  function ollamaModelAvailable(models, configuredModel) {
    if (!Array.isArray(models) || !configuredModel) return false;
    const target = String(configuredModel).trim().toLowerCase();
    const aliases = new Set([target]);
    if (target.endsWith(':latest')) aliases.add(target.slice(0, -7));
    else if (!target.includes(':')) aliases.add(target + ':latest');

    return models.some(entry => {
      const names = typeof entry === 'string' ? [entry] : [entry && entry.name, entry && entry.model];
      return names.some(name => name && aliases.has(String(name).trim().toLowerCase()));
    });
  }

  function extractKnowledgeStats(markdown) {
    const text = String(markdown || '');
    const matchNumber = patterns => {
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return Number(match[1]);
      }
      return null;
    };

    return {
      assets: matchNumber([/(\d+)\s+assets\b/i]),
      findings: matchNumber([/(\d+)\s+active\b/i, /(\d+)\s+findings\b/i]),
      cves: matchNumber([/(\d+)\s+CVEs\b/i]),
      health: matchNumber([/Endpoint health:.*?(\d+)%\s+pass rate/i, /health:\s*(\d+)%/i]),
      gpo: matchNumber([/GPO compliance:.*?(\d+)%\s+compliant/i, /GPO compliance:\s*(\d+)%/i]),
    };
  }

  function shouldUseOllama(source, enabled, state) {
    return source === 'live' && enabled === true && state === 'available';
  }

  return Object.freeze({
    normalizeCveId,
    parseCSVRecords,
    captureSection,
    filterSuiteRecords,
    parseStructuredQuery,
    classifyClippyReaction,
    ollamaModelAvailable,
    extractKnowledgeStats,
    shouldUseOllama,
  });
});
