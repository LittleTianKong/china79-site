const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const root = path.join(__dirname, "..");
const styles = new Proxy({}, { get: (_target, key) => String(key) });
const versionPage = "app/data/us-china-engagement/trump-first-administration/versions/[version]/page.tsx";

function load(file, overrides = {}) {
  const filename = path.join(root, file);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  const resolve = (id) => {
    if (id in overrides) return overrides[id];
    if (id.endsWith(".css")) return { default: styles };
    if (id === "next/link") return { default: ({ children, ...props }) => React.createElement("a", props, children) };
    if (id.startsWith("@/")) {
      const base = id.slice(2);
      return load(`${base}${fs.existsSync(path.join(root, `${base}.ts`)) ? ".ts" : ".tsx"}`, overrides);
    }
    return require(id);
  };
  vm.runInNewContext(source, { module, exports: module.exports, require: resolve, URL }, { filename });
  return module.exports;
}

function languageOverrides(language, extra = {}) {
  return { "@/components/LanguageProvider": { useLanguage: () => ({ language }) }, ...extra };
}

// Model the next update without editing the preserved published snapshot. The
// intentionally different counts, date, files, and citation catch accidental
// reads from the current dataset on a historical release page.
function futureReleaseFixture() {
  const original = load("lib/datasets.ts");
  const oldRelease = original.trumpFirstAdministrationReleases.find((release) => release.version === "1.0.0");
  const futureRelease = {
    ...oldRelease,
    version: "9.9.9",
    date: "2030-02-03",
    tag: oldRelease.tag.replace("1.0.0", "9.9.9"),
    path: oldRelease.path.replace("1.0.0", "9.9.9"),
    url: oldRelease.url.replace("1.0.0", "9.9.9"),
    retainedRecords: 9876,
    includedRecords: 9000,
    excludedRecords: 876,
    notes: { en: "Future release fixture notes.", zh: "未来版本测试说明。" },
    files: oldRelease.files.map((file) => ({ ...file, name: file.name.replaceAll("1.0.0", "9.9.9"), url: file.url.replaceAll("1.0.0", "9.9.9") })),
    citation: "Future release citation, Version 9.9.9.",
    bibtex: "@misc{future_release_9_9_9}",
  };
  const releases = [futureRelease, ...original.trumpFirstAdministrationReleases];
  const dataset = {
    ...original.trumpFirstAdministrationDataset,
    release: futureRelease,
    releases,
    retainedRecords: futureRelease.retainedRecords,
    includedRecords: futureRelease.includedRecords,
    excludedRecords: futureRelease.excludedRecords,
    citation: futureRelease.citation,
    bibtex: futureRelease.bibtex,
  };
  return {
    oldRelease,
    futureRelease,
    dataset,
    module: {
      ...original,
      trumpFirstAdministrationReleases: releases,
      trumpFirstAdministrationDataset: dataset,
      getTrumpDatasetRelease: (version) => releases.find((release) => release.version === version),
    },
  };
}

test("published versions have exact lookup, stable permalinks, and their own complete snapshot metadata", () => {
  const { trumpFirstAdministrationReleases: releases, trumpFirstAdministrationDataset: dataset, getTrumpDatasetRelease } = load("lib/datasets.ts");
  assert.ok(releases.length >= 1);
  assert.equal(dataset.release, releases[0]);
  assert.equal(dataset.releases, releases);
  for (const key of ["retainedRecords", "includedRecords", "excludedRecords", "citation", "bibtex"]) assert.equal(dataset[key], releases[0][key]);
  assert.equal(new Set(releases.map((release) => release.version)).size, releases.length);
  for (const release of releases) {
    assert.equal(getTrumpDatasetRelease(release.version), release);
    assert.equal(release.path, `${dataset.path}/versions/${release.version}`);
    assert.equal(release.includedRecords + release.excludedRecords, release.retainedRecords);
    assert.ok(release.citation.includes(release.version));
    assert.ok(release.citation.includes(`https://china79.org${release.path}`));
    assert.ok(release.bibtex.includes(`https://china79.org${release.path}`));
    assert.ok(release.notes.en && release.notes.zh);
    for (const file of release.files) {
      assert.ok(file.name.includes(`v${release.version}.`));
      assert.ok(file.url.includes(`/releases/download/${release.tag}/`));
    }
  }
  const initial = getTrumpDatasetRelease("1.0.0");
  assert.equal(initial.date, "2026-10-17");
  assert.equal(initial.retainedRecords, 745);
  assert.equal(initial.includedRecords, 719);
  assert.equal(initial.excludedRecords, 26);
  for (const version of ["unknown", "v1.0.0", "1.0", "../1.0.0", "toString", ""]) assert.equal(getTrumpDatasetRelease(version), undefined);
});

test("version downloads remain in initial HTML in either language before statistics load", () => {
  const { oldRelease } = futureReleaseFixture();
  for (const language of ["en", "zh"]) {
    const { default: Downloads } = load("components/DatasetDownloads.tsx", languageOverrides(language));
    const html = renderToStaticMarkup(React.createElement(Downloads, { slug: "us-china-engagement-trump1", release: oldRelease }));
    for (const file of oldRelease.files) assert.ok(html.includes(`href="${file.url}"`));
    assert.ok(html.includes(`href="${oldRelease.url}"`));
    assert.ok(html.includes(`href="${oldRelease.license}"`));
    assert.doesNotMatch(html, />0<\/strong>/);
    assert.doesNotMatch(html, /Downloads open with the first release|首次发布后开放下载/);
  }
});

function renderWithStats(release, stats, compact = false, kind = "dataset") {
  const hooks = {
    ...React,
    useState: (initial) => [initial === null ? stats : initial, () => {}],
    useEffect: () => {},
  };
  const { default: Downloads } = load("components/DatasetDownloads.tsx", languageOverrides("en", { react: hooks }));
  return renderToStaticMarkup(React.createElement(Downloads, { slug: "us-china-engagement-trump1", release, compact, kind }));
}

test("release download counters exclude other versions while keeping registered direct download URLs", () => {
  const { oldRelease, futureRelease } = futureReleaseFixture();
  const files = [oldRelease, futureRelease].flatMap((release, releaseIndex) => release.files.map((file, index) => ({
    ...file,
    id: 1 + releaseIndex * 10 + index,
    version: release.version,
    count: releaseIndex === 0 ? index + 1 : 10000,
    size: 100,
  })));
  const stats = { status: "available", files, total: 30006, releasesUrl: "https://github.com/LittleTianKong/china79-site/releases", checkedAt: null };
  const html = renderWithStats(oldRelease, stats);
  assert.match(html, /<strong>6<\/strong>/);
  assert.doesNotMatch(html, /30,006|10,000|9\.9\.9/);
  for (const file of oldRelease.files) assert.ok(html.includes(`href="${file.url}"`));
  assert.match(renderWithStats(oldRelease, stats, true), /6 downloads/);
  const unrelated = { ...stats, files: files.filter((file) => file.version === futureRelease.version), total: 30000 };
  const pendingHtml = renderWithStats(oldRelease, unrelated);
  assert.doesNotMatch(pendingHtml, /30,000|10,000|9\.9\.9/);
  assert.match(pendingHtml, /Download counts are updating/);
  for (const file of oldRelease.files) assert.ok(pendingHtml.includes(`href="${file.url}"`));
  const partial = { ...stats, files: files.filter((file) => file.version !== oldRelease.version || file.name !== oldRelease.files[2].name) };
  const partialHtml = renderWithStats(oldRelease, partial);
  assert.doesNotMatch(partialHtml, /class="total"|30,006|9\.9\.9/);
  for (const file of oldRelease.files) assert.ok(partialHtml.includes(`href="${file.url}"`));
  assert.match(renderWithStats(oldRelease, partial, true), /Download counts are updating/);
  assert.doesNotMatch(renderWithStats(oldRelease, partial, true), /3 downloads|30,006/);
});

test("series downloads keep all member versions and the overall total when a fallback release is supplied", () => {
  const { oldRelease, futureRelease } = futureReleaseFixture();
  const files = [oldRelease, futureRelease].flatMap((release, releaseIndex) => release.files.map((file, index) => ({
    ...file,
    id: 1 + releaseIndex * 10 + index,
    version: release.version,
    count: releaseIndex === 0 ? 1 : 10000,
    size: 100,
  })));
  files.push({
    id: 100,
    name: "us-china-engagement-data-clinton-v1.0.0.csv",
    version: "clinton-v1.0.0",
    count: 7,
    size: 100,
    format: "CSV",
    url: "https://github.com/LittleTianKong/china79-site/releases/download/us-china-engagement-clinton-v1.0.0/us-china-engagement-data-clinton-v1.0.0.csv",
  });
  const stats = { status: "available", files, total: 30010, releasesUrl: "https://github.com/LittleTianKong/china79-site/releases", checkedAt: null };
  const html = renderWithStats(oldRelease, stats, false, "series");
  assert.match(html, /<strong>30,010<\/strong>/);
  assert.match(html, /Across all published files in the series/);
  for (const file of files) assert.ok(html.includes(`href="${file.url}"`));
  assert.match(html, /9\.9\.9/);
  assert.match(html, /clinton-v1\.0\.0/);
  assert.match(renderWithStats(oldRelease, stats, true, "series"), /30,010 downloads/);
});

test("the bilingual archive renders old and current release notes, counts, permalinks, and files without statistics", () => {
  const fixture = futureReleaseFixture();
  for (const language of ["en", "zh"]) {
    const { default: Archive } = load("components/DatasetArchiveClient.tsx", languageOverrides(language, { "@/lib/datasets": fixture.module }));
    const html = renderToStaticMarkup(React.createElement(Archive));
    for (const release of [fixture.futureRelease, fixture.oldRelease]) {
      assert.ok(html.includes(`href="${release.path}"`));
      assert.ok(html.includes(`dateTime="${release.date}"`));
      assert.ok(html.includes(release.notes[language]));
      for (const file of release.files) assert.ok(html.includes(`href="${file.url}"`));
      for (const key of ["retainedRecords", "includedRecords", "excludedRecords"]) {
        assert.ok(html.includes(`<dd>${new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US").format(release[key])}</dd>`));
      }
    }
    assert.ok(html.indexOf(`href="${fixture.futureRelease.path}"`) < html.indexOf(`href="${fixture.oldRelease.path}"`));
    assert.match(html, language === "zh" ? /当前版本/ : />Current</);
    assert.match(html, language === "zh" ? /历史版本/ : />Archived</);
    assert.doesNotMatch(html, /This is the first published version|目前为首个已发布版本/);
  }
});

test("a preserved release page uses its own counts, date, citation, and download files after a newer release is current", () => {
  const fixture = futureReleaseFixture();
  for (const language of ["en", "zh"]) {
    const { default: Member } = load("components/DatasetMemberClient.tsx", languageOverrides(language, { "@/lib/datasets": fixture.module }));
    const html = renderToStaticMarkup(React.createElement(Member, { release: fixture.oldRelease, versionPage: true }));
    assert.ok(html.includes(`dateTime="${fixture.oldRelease.date}"`));
    assert.match(html, />745<\/strong>/);
    assert.match(html, />719<\/strong>/);
    assert.match(html, />26<\/strong>/);
    assert.ok(html.includes(fixture.oldRelease.citation));
    assert.ok(html.includes(`href="${fixture.dataset.path}/versions"`));
    assert.ok(html.includes(`href="${fixture.dataset.path}"`));
    for (const file of fixture.oldRelease.files) assert.ok(html.includes(`href="${file.url}"`));
    assert.doesNotMatch(html, /9,876|9,000|2030-02-03|Future release citation/);
    for (const file of fixture.futureRelease.files) assert.equal(html.includes(file.url), false);
    assert.match(html, language === "zh" ? /历史版本/ : /Archived version/);
  }
});

function findElement(node, type) {
  if (!node || typeof node !== "object") return undefined;
  if (node.type === type) return node;
  for (const child of React.Children.toArray(node.props?.children)) {
    const match = findElement(child, type);
    if (match) return match;
  }
}

test("release routes generate every registered version and reject unknown versions instead of serving the latest", async () => {
  const fixture = futureReleaseFixture();
  function Member() { return null; }
  function StructuredData() { return null; }
  const page = load(versionPage, {
    "@/lib/datasets": fixture.module,
    "@/components/DatasetMemberClient": { default: Member },
    "@/components/StructuredData": { default: StructuredData },
    "next/navigation": { notFound: () => { throw new Error("NOT_FOUND"); } },
  });
  assert.deepEqual(Array.from(page.generateStaticParams(), (params) => params.version), fixture.dataset.releases.map((release) => release.version));
  for (const release of fixture.dataset.releases) {
    const params = Promise.resolve({ version: release.version });
    const tree = await page.default({ params });
    const member = findElement(tree, Member);
    assert.equal(member.props.release, release);
    assert.equal(member.props.versionPage, true);
    assert.equal(findElement(tree, StructuredData).props.data.version, release.version);
    const metadata = await page.generateMetadata({ params });
    assert.ok(metadata.title.includes(release.version));
    assert.ok(metadata.description.includes(release.date));
    assert.ok(metadata.description.includes(String(release.retainedRecords)));
    assert.equal(metadata.alternates.canonical, `https://china79.org${release.path}`);
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.equal(metadata.robots.index, true);
  }
  for (const version of ["missing", "v1.0.0", "toString"]) {
    await assert.rejects(() => page.default({ params: Promise.resolve({ version }) }), /NOT_FOUND/);
    await assert.rejects(() => page.generateMetadata({ params: Promise.resolve({ version }) }), /NOT_FOUND/);
  }
});

test("archived structured data and search discovery retain version identity when the current release changes", () => {
  const fixture = futureReleaseFixture();
  const { trumpReleaseStructuredData, trumpDatasetStructuredData, indexedPaths } = load("lib/seo.ts", { "@/lib/datasets": fixture.module });
  const data = trumpReleaseStructuredData(fixture.oldRelease);
  assert.equal(data["@type"], "Dataset");
  assert.equal(data["@id"], `https://china79.org${fixture.oldRelease.path}#dataset`);
  assert.equal(data.url, `https://china79.org${fixture.oldRelease.path}`);
  assert.notEqual(data["@id"], trumpDatasetStructuredData["@id"]);
  assert.equal(data.version, fixture.oldRelease.version);
  assert.equal(data.datePublished, fixture.oldRelease.date);
  assert.equal(data.citation, fixture.oldRelease.citation);
  assert.match(data.description, /745 records.*719.*26/s);
  assert.doesNotMatch(data.description, /9876|9000|9\.9\.9/);
  assert.deepEqual(Array.from(data.distribution, (file) => file.contentUrl), Array.from(fixture.oldRelease.files, (file) => file.url));
  assert.ok(indexedPaths.includes(`${fixture.dataset.path}/versions`));
  for (const release of fixture.dataset.releases) assert.ok(indexedPaths.includes(release.path));
});
