const test = require('node:test');
const assert = require('node:assert/strict');

const { classifyClippyReaction } = require('../js/askclippy-core.js');

test('treats remediation summaries as pipeline information, not queue success', () => {
  assert.equal(
    classifyClippyReaction(
      '**Overall Remediation Rate:** 0%\n- 0 completed out of 0 total remediations\n- 0 still pending',
      'What is our overall remediation rate across all teams?'
    ),
    'pipeline'
  );
});

test('celebrates only when a remediation action was actually queued', () => {
  assert.equal(
    classifyClippyReaction(
      '✅ **Queued CVE-2026-12345 for remediation** via RemFlow.',
      'Remediate CVE-2026-12345'
    ),
    'queued'
  );
  assert.equal(
    classifyClippyReaction('There are 3 queued remediations.', 'Show the remediation queue'),
    'pipeline'
  );
});

test('keeps error, critical, good-news, and default reactions distinct', () => {
  assert.equal(classifyClippyReaction("I couldn't find a match", 'hello'), 'error');
  assert.equal(classifyClippyReaction('3 critical KEV findings', 'show findings'), 'critical');
  assert.equal(classifyClippyReaction('All endpoints are healthy', 'health'), 'good');
  assert.equal(classifyClippyReaction('Here is your summary', 'summary'), 'default');
});
