'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');
const { filterSuiteRecords } = require('../js/askclippy-core.js');

let contract;

test.before(async () => {
  const contractPath = resolve(__dirname, '../js/shared/contract.js');
  const source = await readFile(contractPath, 'utf8');
  const sourceUrl = pathToFileURL(contractPath).href;
  const encoded = Buffer.from(`${source}\n//# sourceURL=${sourceUrl}`).toString('base64');
  contract = await import(`data:text/javascript;base64,${encoded}`);
});

test('finding validator filters malformed live-pipeline findings', () => {
  const valid = {
    cve: 'CVE-2026-10001',
    asset: 'SRV-PROD-01',
    severity: 'Critical',
    state: 'Active',
    firstSeen: '2026-07-01',
  };
  const invalid = { ...valid, asset: '', severity: 'Urgent' };

  assert.deepEqual(filterSuiteRecords([valid, invalid], contract.validateFinding), {
    validRecords: [valid],
    rejected: 1,
  });
});

test('asset validator requires a hostname and validates typed optional fields', () => {
  const valid = {
    hostname: 'DC-PROD-01',
    assetId: 'asset-01',
    warrantyMonths: 36,
    serverRoles: ['Domain Controller'],
  };
  const invalid = { hostname: '', warrantyMonths: '36' };

  assert.deepEqual(filterSuiteRecords([valid, invalid], contract.validateAsset), {
    validRecords: [valid],
    rejected: 1,
  });
});

test('remediation validator enforces canonical handoff fields and states', () => {
  const valid = {
    cve: 'CVE-2026-10001',
    name: 'Patch vulnerable library',
    assets: ['SRV-PROD-01'],
    status: 'pending',
    createdAt: '2026-07-31T12:00:00Z',
  };
  const invalid = { ...valid, assets: null, status: 'complete' };

  assert.deepEqual(filterSuiteRecords([valid, invalid], contract.validateRemediation), {
    validRecords: [valid],
    rejected: 1,
  });
});

test('verification validator requires evidence and a canonical result', () => {
  const valid = {
    findingId: 'finding-01',
    asset: 'SRV-PROD-01',
    cve: 'CVE-2026-10001',
    verifiedAt: '2026-07-31T12:00:00Z',
    result: 'pass',
    evidence: 'Scanner no longer detects the vulnerable version.',
  };
  const invalid = { ...valid, result: 'unknown', evidence: '' };

  assert.deepEqual(filterSuiteRecords([valid, invalid], contract.validateVerification), {
    validRecords: [valid],
    rejected: 1,
  });
});

test('filterSuiteRecords degrades safely when data or validators are unavailable', () => {
  const records = [{ id: 1 }];
  assert.deepEqual(filterSuiteRecords(null, contract.validateAsset), {
    validRecords: [],
    rejected: 0,
  });
  assert.deepEqual(filterSuiteRecords(records, null), {
    validRecords: records,
    rejected: 0,
  });
  assert.notEqual(filterSuiteRecords(records, null).validRecords, records);
});
