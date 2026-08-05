(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AskClippyStorage = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const REFERENCE_QUOTA_BYTES = 5 * 1024 * 1024;

  function createLocalStorageAdapter(localStore, logger) {
    if (!localStore) throw new Error('A localStorage-compatible backend is required');
    const log = logger || (typeof console !== 'undefined' ? console : { warn() {}, error() {} });

    async function read(key) {
      if (!key || typeof key !== 'string') return null;
      try {
        const raw = localStore.getItem(key);
        return raw === null ? null : JSON.parse(raw);
      } catch (error) {
        log.warn('[AskClippy] Fallback storage read failed:', key, error.message);
        return null;
      }
    }

    async function write(key, value) {
      if (!key || typeof key !== 'string' || value === undefined) return false;
      try {
        localStore.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        log.warn('[AskClippy] Fallback storage write failed:', key, error.message);
        return false;
      }
    }

    async function remove(key) {
      if (!key || typeof key !== 'string') return false;
      try {
        localStore.removeItem(key);
        return true;
      } catch (error) {
        log.warn('[AskClippy] Fallback storage remove failed:', key, error.message);
        return false;
      }
    }

    async function readCollection(key) {
      const value = await read(key);
      if (Array.isArray(value)) return value;
      if (value && Array.isArray(value.rows)) return value.rows;
      if (value && Array.isArray(value.data)) return value.data;
      return [];
    }

    async function writeCollection(key, records) {
      return Array.isArray(records) ? write(key, records) : false;
    }

    async function has(key) {
      if (!key || typeof key !== 'string') return false;
      try {
        return localStore.getItem(key) !== null;
      } catch (_) {
        return false;
      }
    }

    async function keys(prefix) {
      try {
        const result = [];
        for (let i = 0; i < localStore.length; i++) {
          const key = localStore.key(i);
          if (key && (!prefix || key.startsWith(prefix))) result.push(key);
        }
        return result;
      } catch (_) {
        return [];
      }
    }

    async function quota() {
      try {
        let usedBytes = 0;
        for (let i = 0; i < localStore.length; i++) {
          const key = localStore.key(i);
          if (key) usedBytes += (key.length + (localStore.getItem(key) || '').length) * 2;
        }
        const remainingBytes = Math.max(0, REFERENCE_QUOTA_BYTES - usedBytes);
        return {
          usedBytes,
          quotaBytes: REFERENCE_QUOTA_BYTES,
          remainingBytes,
          pctUsed: Math.round((usedBytes / REFERENCE_QUOTA_BYTES) * 100),
        };
      } catch (_) {
        return {
          usedBytes: 0,
          quotaBytes: REFERENCE_QUOTA_BYTES,
          remainingBytes: REFERENCE_QUOTA_BYTES,
          pctUsed: 0,
        };
      }
    }

    async function clear(prefix) {
      const matchingKeys = await keys(prefix);
      let removed = 0;
      for (const key of matchingKeys) {
        if (await remove(key)) removed++;
      }
      return removed;
    }

    return Object.freeze({
      read,
      write,
      remove,
      readCollection,
      writeCollection,
      has,
      keys,
      quota,
      clear,
    });
  }

  return Object.freeze({ createLocalStorageAdapter });
});
