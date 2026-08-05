const test = require('node:test');
const assert = require('node:assert/strict');

const { ollamaModelAvailable, shouldUseOllama } = require('../js/askclippy-core.js');

test('matches configured Ollama models by name or model field', () => {
  const models = [
    { name: 'phi3:mini', model: 'phi3:mini' },
    { name: 'gemma3:latest', model: 'gemma3:latest' },
  ];
  assert.equal(ollamaModelAvailable(models, 'phi3:mini'), true);
  assert.equal(ollamaModelAvailable(models, 'gemma3'), true);
});

test('normalizes model casing and latest aliases', () => {
  assert.equal(ollamaModelAvailable([{ name: 'LLAMA3.2:latest' }], 'llama3.2'), true);
  assert.equal(ollamaModelAvailable([{ model: 'mistral' }], 'mistral:latest'), true);
});

test('reports missing or malformed model lists safely', () => {
  assert.equal(ollamaModelAvailable([{ name: 'gemma3:latest' }], 'phi3:mini'), false);
  assert.equal(ollamaModelAvailable(null, 'phi3:mini'), false);
  assert.equal(ollamaModelAvailable([], ''), false);
});

test('uses Ollama structured retrieval only for available live-pipeline data', () => {
  assert.equal(shouldUseOllama('live', true, 'available'), true);
  assert.equal(shouldUseOllama('snapshot', true, 'available'), false);
  assert.equal(shouldUseOllama('upload', true, 'available'), false);
  assert.equal(shouldUseOllama('live', false, 'available'), false);
  assert.equal(shouldUseOllama('live', true, 'unavailable'), false);
});
