const test = require('node:test');
const assert = require('node:assert/strict');

test('all routes receive anti-framing, MIME, and referrer protections', async () => {
  const { default: config } = await import('../next.config.mjs');
  const rules = await config.headers();
  const rule = rules.find(item => item.source === '/:path*');
  assert.ok(rule, 'protections must cover nested pages and API responses');
  const headers = Object.fromEntries(rule.headers.map(item => [item.key.toLowerCase(), item.value]));
  assert.equal(headers['x-content-type-options'], 'nosniff');
  assert.equal(headers['x-frame-options'], 'DENY');
  assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
  const directives = new Map(headers['content-security-policy'].split(';').map(value => {
    const [name, ...sources] = value.trim().split(/\s+/);
    return [name, sources];
  }));
  assert.deepEqual(directives.get('frame-ancestors'), ["'none'"]);
  assert.deepEqual(directives.get('object-src'), ["'none'"]);
  assert.deepEqual(directives.get('base-uri'), ["'self'"]);
  assert.deepEqual(directives.get('form-action'), ["'self'"]);
  const permissions = headers['permissions-policy'];
  for (const feature of ['camera', 'microphone', 'geolocation']) assert.ok(permissions.includes(`${feature}=()`));
  assert.equal(permissions.includes('clipboard-write=()'), false, 'citation copying must remain usable');
  assert.equal(config.poweredByHeader, false);
});

test('legacy redirect matches only its exact host and preserves nested paths', async () => {
  const { default: config } = await import('../next.config.mjs');
  const rules = await config.redirects();
  assert.equal(rules.length, 1);
  const rule = rules[0];
  const hostRule = rule.has.find(item => item.type === 'host');
  const matches = new RegExp(`^(?:${hostRule.value})$`);
  assert.equal(matches.test('china79-site.vercel.app'), true);
  for (const host of ['china79.org', 'localhost', '127.0.0.1', 'china79-preview.vercel.app', 'china79-siteXvercelYapp', 'china79-site.vercel.app.attacker.example']) {
    assert.equal(matches.test(host), false, host);
  }
  assert.equal(rule.permanent, true);
  assert.equal(rule.source, '/:path*');
  assert.equal(rule.destination, 'https://china79.org/:path*');
  const datasetPath = '/data/us-china-engagement/trump-first-administration';
  assert.equal(rule.destination.replace('/:path*', datasetPath), `https://china79.org${datasetPath}`);
});
