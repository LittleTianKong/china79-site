const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.join(__dirname, "..");
function load(file, overrides = {}) {
  const filename = path.join(root, file);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  const resolve = (id) => {
    if (id in overrides) return overrides[id];
    if (id.startsWith("@/components/")) return () => null;
    if (id.startsWith("@/")) return load(`${id.slice(2)}.ts`, overrides);
    return require(id);
  };
  vm.runInNewContext(source, { module, exports: module.exports, require: resolve, URL }, { filename });
  return module.exports;
}

test("canonical URL construction cannot point search engines at another host", () => {
  const { absoluteUrl, SITE_URL } = load("lib/seo.ts");
  assert.equal(absoluteUrl("/data"), `${SITE_URL}/data`);
  assert.equal(absoluteUrl("/data#catalog"), `${SITE_URL}/data#catalog`);
  for (const value of ["https://other.example/data", "//other.example/data", "/\\other.example/data", "data"]) {
    assert.throws(() => absoluteUrl(value));
  }
});

test("structured data cannot close its script and preserves the original content", () => {
  const { serializeStructuredData } = load("lib/seo.ts");
  const original = { name: "</script><script>alert('x')</script>", description: "美中\u2028data\u2029" };
  const encoded = serializeStructuredData(original);
  assert.equal(encoded.includes("<"), false);
  assert.equal(encoded.includes("\u2028"), false);
  assert.deepEqual(JSON.parse(encoded), original);
});

test("the released dataset has a single canonical identity and verified public release metadata", () => {
  const { trumpDatasetStructuredData: data, seriesStructuredData: series, catalogStructuredData: catalog, siteStructuredData } = load("lib/seo.ts");
  const { trumpFirstAdministrationDataset } = load("lib/datasets.ts");
  assert.equal(data["@type"], "Dataset");
  assert.equal(data.name, trumpFirstAdministrationDataset.title.en);
  assert.equal(data.url, trumpFirstAdministrationDataset.url);
  assert.equal(data.version, trumpFirstAdministrationDataset.release.version);
  assert.equal(data.creator.name, "Michael C. Rhind-Tutt");
  assert.equal(data.temporalCoverage, "2017-01-20/2021-01-20");
  assert.ok(data.description.length >= 50 && data.description.length <= 5000);
  assert.ok(data.description.includes(`${trumpFirstAdministrationDataset.retainedRecords} records`));
  assert.ok(data.description.includes(`${trumpFirstAdministrationDataset.includedRecords} are included`));
  assert.ok(data.description.includes(`${trumpFirstAdministrationDataset.excludedRecords} are retained`));
  assert.doesNotMatch(data.description, /forthcoming/i);
  assert.equal(data.datePublished, trumpFirstAdministrationDataset.release.date);
  assert.equal(data.license, "https://creativecommons.org/licenses/by/4.0/");
  assert.equal(data.isAccessibleForFree, true);
  assert.equal(data.citation, trumpFirstAdministrationDataset.citation);
  assert.equal(data.distribution.length, 3);
  assert.deepEqual(Array.from(data.distribution, file => file.contentUrl), Array.from(trumpFirstAdministrationDataset.release.files, file => file.url));
  for (const file of data.distribution) {
    assert.equal(file["@type"], "DataDownload");
    assert.equal(file.license, data.license);
    assert.ok(file.contentUrl.startsWith(`https://github.com/LittleTianKong/china79-site/releases/download/${trumpFirstAdministrationDataset.release.tag}/`));
    assert.ok(file.encodingFormat);
  }
  assert.equal(series["@type"], "DataCatalog");
  assert.equal(catalog["@type"], "DataCatalog");
  assert.equal(series.dataset.length, 1);
  assert.equal(catalog.dataset.length, 1);
  assert.equal(series.dataset[0]["@id"], data["@id"]);
  assert.equal(catalog.dataset[0]["@id"], data["@id"]);
  assert.equal(series.dataset[0]["@type"], undefined);
  assert.equal(siteStructuredData["@graph"].find(item => item["@type"] === "Organization")["@id"], data.publisher["@id"]);
});

test("all sitemap pages exist, have matching canonicals, and are indexable", async () => {
  const { default: sitemap } = load("app/sitemap.ts");
  const { SITE_URL } = load("lib/seo.ts");
  const { articles } = load("lib/content.ts");
  const { trumpFirstAdministrationDataset: dataset } = load("lib/datasets.ts");
  const entries = sitemap();
  assert.equal(entries.length, 9 + dataset.releases.length + articles.filter(item => item.status === "published").length);
  assert.equal(new Set(entries.map(item => item.url)).size, entries.length);
  for (const item of entries) {
    const pathname = new URL(item.url).pathname;
    const isArticle = pathname.startsWith("/analysis/");
    const version = dataset.releases.find(release => release.path === pathname);
    const file = version ? `app${dataset.path}/versions/[version]/page.tsx` : isArticle ? "app/analysis/[slug]/page.tsx" : `app${pathname === "/" ? "" : pathname}/page.tsx`;
    assert.ok(fs.existsSync(path.join(root, file)), file);
    assert.equal(new URL(item.url).origin, SITE_URL);
    const page = load(file);
    const metadata = version ? await page.generateMetadata({ params: Promise.resolve({ version: version.version }) }) : isArticle ? await page.generateMetadata({ params: Promise.resolve({ slug: pathname.split("/").pop() }) }) : page.metadata;
    assert.equal(metadata.alternates.canonical, item.url, file);
    assert.equal(metadata.robots.index, true, file);
    assert.equal(metadata.openGraph.url, item.url, file);
    assert.equal(metadata.twitter.card, "summary_large_image", file);
    assert.equal(metadata.description.length > 40, true, file);
  }
});

test("published files remain available in initial page HTML before download counters load", () => {
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { trumpFirstAdministrationDataset: dataset } = load("lib/datasets.ts");
  for (const language of ["en", "zh"]) {
    const { default: DatasetDownloads } = load("components/DatasetDownloads.tsx", {
      "@/components/LanguageProvider": { useLanguage: () => ({ language }) },
      "./DatasetDownloads.module.css": { default: new Proxy({}, { get: (_target, key) => String(key) }) },
    });
    const html = renderToStaticMarkup(React.createElement(DatasetDownloads, { slug: dataset.slug, release: dataset.release }));
    for (const file of dataset.release.files) assert.ok(html.includes(`href="${file.url}"`));
    assert.ok(html.includes(`href="${dataset.release.license}"`));
    assert.doesNotMatch(html, /Downloads open with the first release|首次发布后开放下载/);
    assert.doesNotMatch(html, />0<\/strong>/);
  }
});

test("only explicitly published articles enter the sitemap and become indexable", async () => {
  const { articles } = load("lib/content.ts");
  const { isPublishedArticle } = load("lib/seo.ts");
  const navigation = { notFound: () => { throw new Error("NOT_FOUND"); } };
  const { generateMetadata } = load("app/analysis/[slug]/page.tsx", { "next/navigation": navigation });
  for (const article of articles) {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: article.slug }) });
    assert.equal(metadata.title, article.title);
    assert.equal(metadata.robots.index, isPublishedArticle(article));
    if (article.status === "in-development") assert.match(metadata.description, /forthcoming/);
  }
  assert.equal(isPublishedArticle({}), false);
  const published = { ...articles[0], slug: "finished-analysis", status: "published" };
  const overrides = { "@/lib/content": { articles: [...articles, published] }, "next/navigation": navigation };
  const { indexedPaths } = load("lib/seo.ts", overrides);
  assert.ok(indexedPaths.includes("/analysis/finished-analysis"));
  const publishedMetadata = await load("app/analysis/[slug]/page.tsx", overrides).generateMetadata({ params: Promise.resolve({ slug: published.slug }) });
  assert.equal(publishedMetadata.robots.index, true);
  await assert.rejects(() => generateMetadata({ params: Promise.resolve({ slug: "missing" }) }), /NOT_FOUND/);
});

test("legacy and unfinished pages stay crawlable but are excluded from indexing and sitemap", () => {
  const { indexedPaths } = load("lib/seo.ts");
  const { articles } = load("lib/content.ts");
  const { metadata } = load("app/policy-outreach/page.tsx");
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.robots.follow, true);
  assert.equal(indexedPaths.includes("/policy-outreach"), false);
  for (const article of articles.filter(item => item.status !== "published")) assert.equal(indexedPaths.includes(`/analysis/${article.slug}`), false);
});

test("crawler rules allow public pages and search bots while excluding application APIs", () => {
  const { default: robots } = load("app/robots.ts");
  const { SITE_URL } = load("lib/seo.ts");
  const result = robots();
  assert.equal(result.rules.userAgent, "*");
  assert.equal(result.rules.allow, "/");
  assert.equal(result.rules.disallow, "/api/");
  assert.equal(result.sitemap, `${SITE_URL}/sitemap.xml`);
});
