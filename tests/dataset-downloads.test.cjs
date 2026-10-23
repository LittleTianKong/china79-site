const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, fetch, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, { module, exports: module.exports, fetch, Request, Response, AbortSignal, require: (id) => dependencies[id] ?? require(id) }, { filename: file });
  return module.exports;
}
const source = { owner: "LittleTianKong", repository: "china79-site", tagPrefix: "us-china-engagement-v", assetPrefix: "us-china-engagement-data-" };
const asset = (id, count, name = `us-china-engagement-data-v1.0.0-${id}.csv`) => ({ id, name, download_count: count, size: 2048, state: "uploaded" });
const release = (assets, options = {}) => ({ tag_name: "us-china-engagement-v1.0.0", draft: false, prerelease: false, assets, ...options });

test("sums only stable uploaded dataset assets across versions", () => {
  const { summarizeDownloads } = load("lib/dataset-downloads.ts");
  const result = summarizeDownloads([
    release([asset(1, 12), asset(2, 8, "us-china-engagement-data-v1.0.0.xlsx"), asset(9, 999, "methodology.pdf"), asset(10, 999, "source-code.zip"), { ...asset(11, 999), state: "new" }]),
    release([asset(3, 5)], { tag_name: "us-china-engagement-v0.9.0" }),
    release([asset(4, 999)], { draft: true }),
    release([asset(5, 999)], { prerelease: true }),
    release([asset(6, 999)], { tag_name: "another-dataset-v1.0.0" }),
  ], source);
  assert.equal(result.total, 25);
  assert.equal(result.files.length, 3);
  assert.equal(result.status, "available");
  assert.equal(result.files[0].url, "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-v1.0.0/us-china-engagement-data-v1.0.0-1.csv");
  assert.equal(result.files[2].version, "0.9.0");
});

test("distinguishes unpublished data from a released file with zero downloads", () => {
  const { summarizeDownloads } = load("lib/dataset-downloads.ts");
  assert.equal(summarizeDownloads([], source).total, null);
  assert.equal(summarizeDownloads([], source).status, "unreleased");
  assert.equal(summarizeDownloads([release([asset(1, 0)])], source).total, 0);
  assert.equal(summarizeDownloads([release([asset(1, 0)])], source).status, "available");
});

test("configured release tags reset current totals without adding archived or unregistered releases", () => {
  const { summarizeDownloads } = load("lib/dataset-downloads.ts");
  const currentTag = "us-china-engagement-v1.1.0";
  const releases = [
    release([asset(1, 35)]),
    release([asset(2, 0, "us-china-engagement-data-v1.1.0.csv")], { tag_name: currentTag }),
    release([asset(3, 999)], { tag_name: `${currentTag}1` }),
  ];
  const result = summarizeDownloads(releases, { ...source, releaseTags: [currentTag] });
  assert.equal(result.status, "available");
  assert.equal(result.total, 0);
  assert.deepEqual(Array.from(result.files, (file) => file.id), [2]);
  assert.equal(summarizeDownloads(releases, source).total, 1034);
  for (const releaseTags of [[], ["us-china-engagement-v9.9.9"]]) {
    const missing = summarizeDownloads(releases, { ...source, releaseTags });
    assert.equal(missing.status, "unreleased");
    assert.equal(missing.total, null);
  }
});

test("deduplicates assets and rejects malformed counts rather than displaying false totals", () => {
  const { summarizeDownloads } = load("lib/dataset-downloads.ts");
  assert.equal(summarizeDownloads([release([asset(1, 12), asset(1, 12)])], source).total, 12);
  for (const count of [-1, "12", null, 1.5]) assert.throws(() => summarizeDownloads([release([asset(1, count)])], source));
});

test("loads every release page and shares a revalidated fetch cache", async () => {
  const calls = [];
  const { getDatasetDownloads } = load("lib/dataset-downloads.ts", async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1
      ? Response.json([release([asset(1, 12)])], { headers: { link: '<https://api.github.com/next>; rel="next"' } })
      : Response.json([release([asset(2, 8)])]);
  });
  assert.equal((await getDatasetDownloads(source)).total, 20);
  assert.equal(calls.length, 2);
  assert.match(calls[1].url, /page=2$/);
  assert.equal(calls[0].options.next.revalidate, 300);
  assert.equal(calls[0].options.headers.Authorization, undefined);
});

test("cached totals retain the provider timestamp rather than appearing freshly checked", async () => {
  const { getDatasetDownloads } = load("lib/dataset-downloads.ts", async () => Response.json(
    [release([asset(1, 4)])], { headers: { date: "Sat, 17 Oct 2026 22:00:00 GMT" } },
  ));
  const result = await getDatasetDownloads(source);
  assert.equal(result.total, 4);
  assert.equal(result.checkedAt, "2026-10-17T22:00:00.000Z");
  const withoutDate = load("lib/dataset-downloads.ts", async () => Response.json([release([asset(1, 4)])]));
  assert.equal((await withoutDate.getDatasetDownloads(source)).checkedAt, null);
});

test("the counts endpoint does not add a second cache over the shared provider cache", async () => {
  const stats = { status: "available", total: 4, files: [], checkedAt: "2026-10-17T22:00:00.000Z" };
  const { GET, revalidate } = load("app/api/downloads/[slug]/route.ts", null, {
    "@/lib/datasets": { datasetCatalog: [{ slug: "us-china-engagement", downloads: source }] },
    "@/lib/dataset-downloads": { getDatasetDownloads: async () => stats },
  });
  const response = await GET(new Request("https://china79.org/api/downloads/us-china-engagement"), { params: Promise.resolve({ slug: "us-china-engagement" }) });
  assert.equal(revalidate, 0);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), stats);
});

test("provider errors do not become zero counts", async () => {
  for (const fetch of [async () => Response.json({}, { status: 403 }), async () => Response.json({ message: "bad response" }), async () => { throw new Error("offline"); }]) {
    const { getDatasetDownloads } = load("lib/dataset-downloads.ts", fetch);
    await assert.rejects(() => getDatasetDownloads(source));
  }
});

test("API rejects unknown datasets without provider access and returns unavailable on failure", async () => {
  const catalog = { datasetCatalog: [{ slug: "us-china-engagement", downloads: source }] };
  let calls = 0;
  const { GET } = load("app/api/downloads/[slug]/route.ts", null, {
    "@/lib/datasets": catalog,
    "@/lib/dataset-downloads": { getDatasetDownloads: async () => { calls++; throw new Error("unavailable"); } },
  });
  const request = new Request("https://china79.org/api/downloads/unknown");
  assert.equal((await GET(request, { params: Promise.resolve({ slug: "unknown" }) })).status, 404);
  assert.equal(calls, 0);
  const response = await GET(request, { params: Promise.resolve({ slug: "us-china-engagement" }) });
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("series totals include member files while member totals stay separate", () => {
  const { summarizeDownloads } = load("lib/dataset-downloads.ts");
  const series = { ...source, tagPrefix: "us-china-engagement-" };
  const member = { ...source, tagPrefix: "us-china-engagement-trump1-v", assetPrefix: "us-china-engagement-data-trump1-" };
  const releases = [
    release([asset(1, 12, "us-china-engagement-data-trump1-v1.0.0.csv")], { tag_name: "us-china-engagement-trump1-v1.0.0" }),
    release([asset(2, 8, "us-china-engagement-data-other-v1.0.0.csv")], { tag_name: "us-china-engagement-other-v1.0.0" }),
  ];
  assert.equal(summarizeDownloads(releases, series).total, 20);
  assert.equal(summarizeDownloads(releases, member).total, 12);
});

test("API resolves registered member slugs to their own download source", async () => {
  const memberSource = { ...source, assetPrefix: "us-china-engagement-data-trump1-" };
  const { GET } = load("app/api/downloads/[slug]/route.ts", null, {
    "@/lib/datasets": { datasetCatalog: [{ slug: "us-china-engagement", downloads: source, members: [{ slug: "us-china-engagement-trump1", downloads: memberSource }] }] },
    "@/lib/dataset-downloads": { getDatasetDownloads: async (config) => { assert.equal(config, memberSource); return { status: "unreleased", total: null, files: [] }; } },
  });
  const response = await GET(new Request("https://china79.org/api/downloads/us-china-engagement-trump1"), { params: Promise.resolve({ slug: "us-china-engagement-trump1" }) });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).total, null);
});

test("series API totals follow current member releases while member APIs retain archive counts", async () => {
  const { summarizeDownloads } = load("lib/dataset-downloads.ts");
  const currentTag = "us-china-engagement-trump1-v1.1.0";
  const seriesSource = { ...source, tagPrefix: "us-china-engagement-" };
  const memberSource = { ...source, tagPrefix: "us-china-engagement-trump1-v", assetPrefix: "us-china-engagement-data-trump1-" };
  const releases = [
    release([asset(1, 35, "us-china-engagement-data-trump1-v1.0.0.csv")], { tag_name: "us-china-engagement-trump1-v1.0.0" }),
    release([asset(2, 0, "us-china-engagement-data-trump1-v1.1.0.csv")], { tag_name: currentTag }),
    release([asset(3, 999, "us-china-engagement-data-other-v1.0.0.csv")], { tag_name: "us-china-engagement-other-v1.0.0" }),
  ];
  const member = { slug: "us-china-engagement-trump1", downloads: memberSource, release: { tag: currentTag } };
  const { GET } = load("app/api/downloads/[slug]/route.ts", null, {
    "@/lib/datasets": { datasetCatalog: [{ slug: "us-china-engagement", downloads: seriesSource, members: [member] }] },
    "@/lib/dataset-downloads": { getDatasetDownloads: async (config) => summarizeDownloads(releases, config) },
  });
  const request = new Request("https://china79.org/api/downloads/us-china-engagement");
  const series = await (await GET(request, { params: Promise.resolve({ slug: "us-china-engagement" }) })).json();
  assert.equal(series.total, 0);
  assert.equal(series.files.length, 1);
  assert.equal(series.files[0].id, 2);
  const history = await (await GET(request, { params: Promise.resolve({ slug: member.slug }) })).json();
  assert.equal(history.total, 35);
  assert.deepEqual(history.files.map((file) => file.version), ["1.0.0", "1.1.0"]);
});
