'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createLocalStorageAdapter } = require('../js/storage-fallback.js');

class MemoryStorage {
  constructor() {
    this.values = new Map();
  }

  get length() {
    return this.values.size;
  }

  key(index) {
    return [...this.values.keys()][index] ?? null;
  }

  getItem(key) {
    return this.values.has(String(key)) ? this.values.get(String(key)) : null;
  }

  setItem(key, value) {
    this.values.set(String(key), String(value));
  }

  removeItem(key) {
    this.values.delete(String(key));
  }
}

const quietLogger = { warn() {}, error() {} };

test('fallback adapter reads and writes parsed values', async () => {
  const backend = new MemoryStorage();
  const adapter = createLocalStorageAdapter(backend, quietLogger);

  assert.equal(await adapter.read('missing'), null);
  assert.equal(await adapter.write('suite:status', { ready: true }), true);
  assert.equal(backend.getItem('suite:status'), '{"ready":true}');
  assert.deepEqual(await adapter.read('suite:status'), { ready: true });
  assert.equal(await adapter.has('suite:status'), true);
});

test('fallback adapter implements collection wrapper compatibility', async () => {
  const backend = new MemoryStorage();
  const adapter = createLocalStorageAdapter(backend, quietLogger);
  const records = [{ id: 1 }, { id: 2 }];

  assert.equal(await adapter.writeCollection('suite:plain', records), true);
  assert.deepEqual(await adapter.readCollection('suite:plain'), records);

  backend.setItem('suite:rows', JSON.stringify({ rows: records }));
  backend.setItem('suite:data', JSON.stringify({ data: records }));
  assert.deepEqual(await adapter.readCollection('suite:rows'), records);
  assert.deepEqual(await adapter.readCollection('suite:data'), records);
  assert.equal(await adapter.writeCollection('suite:invalid', {}), false);
});

test('fallback adapter degrades safely for malformed data and write failures', async () => {
  const malformed = new MemoryStorage();
  malformed.setItem('suite:broken', '{not-json');
  const adapter = createLocalStorageAdapter(malformed, quietLogger);
  assert.equal(await adapter.read('suite:broken'), null);
  assert.deepEqual(await adapter.readCollection('suite:broken'), []);

  const failingBackend = new MemoryStorage();
  failingBackend.setItem = () => {
    const error = new Error('quota exceeded');
    error.name = 'QuotaExceededError';
    throw error;
  };
  const failingAdapter = createLocalStorageAdapter(failingBackend, quietLogger);
  assert.equal(await failingAdapter.write('suite:value', 1), false);
  assert.equal(await failingAdapter.writeCollection('suite:list', []), false);
});

test('fallback adapter supports key discovery, scoped clearing, removal, and quota reporting', async () => {
  const backend = new MemoryStorage();
  const adapter = createLocalStorageAdapter(backend, quietLogger);
  await adapter.write('security-tools:a', { value: 1 });
  await adapter.write('security-tools:b', { value: 2 });
  await adapter.write('askclippy:preference', 'compact');

  assert.deepEqual((await adapter.keys('security-tools:')).sort(), [
    'security-tools:a',
    'security-tools:b',
  ]);
  const storageQuota = await adapter.quota();
  assert.ok(storageQuota.usedBytes > 0);
  assert.ok(storageQuota.remainingBytes < storageQuota.quotaBytes);

  assert.equal(await adapter.clear('security-tools:'), 2);
  assert.equal(await adapter.has('askclippy:preference'), true);
  assert.equal(await adapter.remove('askclippy:preference'), true);
  assert.equal(await adapter.has('askclippy:preference'), false);
});
