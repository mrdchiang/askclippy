const test = require('node:test');
const assert = require('node:assert/strict');

const { parseStructuredQuery } = require('../js/askclippy-core.js');

test('routes remediation-rate questions to the cross-tool aggregate', () => {
  assert.deepEqual(
    parseStructuredQuery('What is our overall remediation rate across all teams?'),
    { entity: 'remediations', aggregate: 'rate', limit: 100 }
  );
});

test('routes deployed but unverified KEV questions to findings', () => {
  assert.deepEqual(
    parseStructuredQuery('Which KEVs are deployed but not yet verified?'),
    { entity: 'findings', kev: true, deployed: true, unverified: true, limit: 50 }
  );
});

test('routes EOL assets with critical CVEs to the suite join', () => {
  assert.deepEqual(
    parseStructuredQuery('Show EOL assets with a critical CVE'),
    { entity: 'assets', eol: true, has_critical_cve: true, limit: 50 }
  );
});

test('extracts finding filters and normalizes CVE IDs', () => {
  assert.deepEqual(
    parseStructuredQuery('List active critical KEV findings for cve 2026 12345'),
    {
      entity: 'findings',
      limit: 50,
      severity: ['Critical'],
      kev: true,
      state: ['Active'],
      cve: 'CVE-2026-12345',
    }
  );
});

test('routes asset-health and remediation-state questions', () => {
  assert.deepEqual(parseStructuredQuery('Show unhealthy endpoints'), {
    entity: 'assets',
    limit: 50,
    health: 'critical',
  });
  assert.deepEqual(parseStructuredQuery('What is pending in the remediation queue?'), {
    entity: 'remediations',
    limit: 50,
    state: ['pending'],
  });
});

test('returns null for questions without a structured route', () => {
  assert.equal(parseStructuredQuery('Give me an executive summary'), null);
  assert.equal(parseStructuredQuery(''), null);
  assert.equal(parseStructuredQuery(null), null);
});
