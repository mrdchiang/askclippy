'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  captureSection,
  normalizeCveId,
  parseCSVRecords,
} = require('../js/askclippy-core.js');

test('parseCSVRecords handles quoted commas, escaped quotes, and multiline fields', () => {
  const csv = 'name,description,notes\r\n'
    + '"host,01","Issue says ""hello""","line 1\nline 2"\r\n'
    + 'server2,plain,ok';

  assert.deepEqual(parseCSVRecords(csv, 10), [
    ['name', 'description', 'notes'],
    ['host,01', 'Issue says "hello"', 'line 1\nline 2'],
    ['server2', 'plain', 'ok'],
  ]);
});

test('parseCSVRecords skips blank records and respects the record limit', () => {
  assert.deepEqual(parseCSVRecords('a,b\n\n1,2\n3,4\n5,6', 3), [
    ['a', 'b'],
    ['1', '2'],
    ['3', '4'],
  ]);
});

test('parseCSVRecords rejects an unclosed quoted field', () => {
  assert.throws(() => parseCSVRecords('a,b\n"open,value', 10), /Unclosed quoted field/);
});

test('normalizeCveId trims and normalizes case', () => {
  assert.equal(normalizeCveId('  cve-2026-12345  '), 'CVE-2026-12345');
  assert.equal(normalizeCveId(null), '');
});

test('captureSection returns list records inside the requested heading range', () => {
  const lines = [
    '# Report',
    '## Overview',
    '- 10 assets',
    '## Critical KEV CVEs',
    '- CVE-2026-10001',
    '- CVE-2026-10002',
    'Narrative text',
    '## All Active CVEs',
    '- CVE-2026-20001',
  ];

  assert.deepEqual(captureSection(lines, 'Critical KEV CVEs', 'All Active CVEs'), [
    '- CVE-2026-10001',
    '- CVE-2026-10002',
  ]);
  assert.equal(captureSection(lines, 'Missing Section', null), null);
});
