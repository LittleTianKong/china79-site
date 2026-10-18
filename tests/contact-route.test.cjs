const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
function load(relative, env, fetch, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(root, relative), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: (id) => dependencies[id] ?? require(id),
    process: { env }, fetch, Request, Response, AbortSignal, Buffer, Uint8Array, Date, Map, URL,
  }, { filename: relative });
  return module.exports;
}
function endpoint({ enabled = true, fetch = async () => Response.json({ id: "test-only" }) } = {}) {
  const shared = load("lib/contact.ts", {}, fetch);
  return load("app/api/contact/route.ts", enabled ? { RESEND_API_KEY: "test-key", CONTACT_FROM_EMAIL: "China79 <forms@china79.org>" } : {}, fetch, { "@/lib/contact": shared }).POST;
}
const message = { topic: "research", name: "Test researcher", email: "researcher@example.com", organization: "Example institute", message: "A research submission with supporting sources.", website: "" };
function request(body = message, overrides = {}) {
  return new Request("https://china79.org/api/contact", {
    method: "POST", headers: { Origin: "https://china79.org", "Content-Type": "application/json", ...overrides }, body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("delivers only to the fixed inbox, with visitor reply-to and retry deduplication", async () => {
  const calls = [];
  const post = endpoint({ fetch: async (...args) => { calls.push(args); return Response.json({ id: "accepted" }); } });
  assert.equal((await post(request({ ...message, to: "elsewhere@example.com" }))).status, 200);
  assert.equal((await post(request())).status, 200);
  assert.equal(calls[0][0], "https://api.resend.com/emails");
  const payload = JSON.parse(calls[0][1].body);
  assert.deepEqual(payload.to, ["contact@china79.org"]);
  assert.equal(payload.reply_to, message.email);
  assert.equal(payload.subject, "[China79] Research submission");
  assert.match(payload.text, /A research submission/);
  assert.equal(calls[0][1].headers["Idempotency-Key"], calls[1][1].headers["Idempotency-Key"]);
});

test("rejects invalid input and cross-origin requests without calling email service", async () => {
  let calls = 0;
  const post = endpoint({ fetch: async () => { calls++; throw new Error("must not send"); } });
  for (const body of [null, [], { ...message, email: "bad@email\r\nBcc:someone@example.com" }, { ...message, topic: "unknown" }, { ...message, message: "short" }, { ...message, name: " " }, { ...message, website: "bot.example" }, { ...message, organization: "first\nsecond" }, "broken-json"]) {
    assert.equal((await post(request(body))).status, 400);
  }
  assert.equal((await post(request(message, { Origin: "https://another-site.example" }))).status, 403);
  assert.equal((await post(request(message, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await post(request("a".repeat(33000)))).status, 413);
  assert.equal(calls, 0);
});

test("missing configuration and provider failures never report success", async () => {
  assert.equal((await endpoint({ enabled: false })(request())).status, 503);
  for (const fetch of [async () => Response.json({ error: "rejected" }, { status: 401 }), async () => Response.json({}), async () => { throw new Error("timeout"); }]) {
    const response = await endpoint({ fetch })(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  }
});

test("limits repeated submissions on the same instance", async () => {
  let calls = 0;
  const post = endpoint({ fetch: async () => { calls++; return Response.json({ id: "accepted" }); } });
  for (let index = 0; index < 5; index++) assert.equal((await post(request())).status, 200);
  assert.equal((await post(request())).status, 429);
  assert.equal(calls, 5);
});

test("accepts Chinese content without altering the message", async () => {
  const post = endpoint({ fetch: async (_url, options) => {
    assert.match(JSON.parse(options.body).text, /数据集资料来源及覆盖范围/);
    return Response.json({ id: "accepted" });
  } });
  assert.equal((await post(request({ ...message, topic: "datasets", name: "研究人员", message: "希望了解数据集资料来源及覆盖范围。" }))).status, 200);
});
