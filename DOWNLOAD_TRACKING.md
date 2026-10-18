# Dataset download tracking

Each dataset's landing page shows its combined file-download count and a per-file breakdown. The dataset catalog shows a compact total. Counts come from GitHub's release-asset `download_count`; no new account, paid analytics plan, database, or API key is needed for this public repository.

## Publishing the first dataset release

The flagship dataset's configuration is in `lib/datasets.ts`:

- Repository: `LittleTianKong/china79-site`
- Release tag prefix: `us-china-engagement-v`
- Dataset file prefix: `us-china-engagement-data-`

When the dataset is ready:

1. Update its availability copy, version details, and citation for the actual release.
2. Create a [GitHub Release](https://github.com/LittleTianKong/china79-site/releases/new) with a tag such as `us-china-engagement-v1.0.0`.
3. Attach the actual data files, for example `us-china-engagement-data-v1.0.0.csv`, `us-china-engagement-data-v1.0.0.xlsx`, or `us-china-engagement-data-v1.0.0.zip`.
4. Publish a stable public release. Drafts and prereleases are excluded.
5. The files and counters will appear on the dataset page after the cache refresh. Counts update periodically; allow approximately 15–30 minutes.

The names above are conventions, not files that already exist. No placeholder release or fabricated dataset is created by this feature.

To add another dataset, configure its own unique tag and asset prefixes in the catalog and use `<DatasetDownloads slug="the-dataset-slug" />` on its landing page. The same component with `compact` shows the catalog total.

## What is counted

- Download counts for matching uploaded dataset assets across stable public releases.
- Supported extensions: CSV, TSV, XLSX, JSON, Parquet, ZIP, DTA, SAV, RDS.
- Downloads directly from GitHub are included too.
- Page visits, email access inquiries, citation copies, documentation files without the data prefix, and GitHub's generated source archives are excluded.

These are file-download counts reported by GitHub. They can include repeat downloads and automated traffic; they do not measure unique people or prove a completed local save. Deleting or replacing release assets can remove or reset their counts. Keep old assets to retain the release history. Files hosted elsewhere are not included.

No releases means **not released**, rather than a fabricated zero. A published file with no downloads legitimately shows zero. If GitHub is unavailable, the site shows an unavailable state and keeps the dataset page usable.

## Implementation and checks

The read-only endpoint is `/api/downloads/us-china-engagement`. It validates catalog slugs, paginates release history, caches shared public API responses, and never increments a counter on page view. Download links point directly to GitHub release assets; no file proxy or browser tracking cookie is added.

Run `node --test tests/dataset-downloads.test.cjs`. Tests use fixtures and mock requests only; they do not publish releases or download files.

GitHub reference: [Release asset API and download counts](https://docs.github.com/en/rest/releases/assets).
