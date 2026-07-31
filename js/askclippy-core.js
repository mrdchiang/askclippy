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

  return Object.freeze({
    normalizeCveId,
    parseCSVRecords,
    captureSection,
    filterSuiteRecords,
  });
});
