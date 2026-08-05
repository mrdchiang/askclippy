const test = require('node:test');
const assert = require('node:assert/strict');

const { extractKnowledgeStats } = require('../js/askclippy-core.js');

test('extracts snapshot totals and compliance rates', () => {
  const markdown = [
    '- 30 assets · 138 findings · 82 active',
    '- 20 CVEs (6 KEV)',
    '- Endpoint health: 270 endpoint checks: 72% pass rate, 0 critical failures',
    '- GPO compliance: 480 GPO policies: 68% compliant',
  ].join('\n');

  assert.deepEqual(extractKnowledgeStats(markdown), {
    assets: 30,
    findings: 82,
    cves: 20,
    health: 72,
    gpo: 68,
  });
});

test('extracts live and uploaded totals without stale defaults', () => {
  assert.deepEqual(extractKnowledgeStats('- 4 findings, 2 assets'), {
    assets: 2,
    findings: 4,
    cves: null,
    health: null,
    gpo: null,
  });
  assert.deepEqual(extractKnowledgeStats('- 1 assets, 1 findings'), {
    assets: 1,
    findings: 1,
    cves: null,
    health: null,
    gpo: null,
  });
});

test('returns explicit nulls for unavailable metrics', () => {
  assert.deepEqual(extractKnowledgeStats(''), {
    assets: null,
    findings: null,
    cves: null,
    health: null,
    gpo: null,
  });
});
