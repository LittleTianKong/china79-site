# Dataset download tracking

The Flagship Series page shows combined file-download counts across the series; individual dataset pages show counts for their own files. The catalog shows a compact series total. Counts come from GitHub's release-asset `download_count`; no new account, paid analytics plan, database, or API key is needed for this public repository. The planned number of datasets (eight) is separate from the number of release assets or downloads.

## Publishing the first dataset release

The flagship series and its first member are configured in `lib/datasets.ts`:

- Repository: `LittleTianKong/china79-site`
- Series release tag prefix: `us-china-engagement-`
- Series data-file prefix: `us-china-engagement-data-`
- First dataset release tag prefix: `us-china-engagement-trump1-v`
- First dataset data-file prefix: `us-china-engagement-data-trump1-`

When the dataset is ready:

1. Update its availability copy, version details, and citation for the actual release.
2. For the first dataset, create a [GitHub Release](https://github.com/LittleTianKong/china79-site/releases/new) with a tag such as `us-china-engagement-trump1-v1.0.0`.
3. Attach the actual data files, for example `us-china-engagement-data-trump1-v1.0.0.csv`, `us-china-engagement-data-trump1-v1.0.0.xlsx`, or `us-china-engagement-data-trump1-v1.0.0.zip`. Include the codebook and counting guidance with the release; methodology files without the data prefix are not counted as dataset downloads.
4. Publish a stable public release. Drafts and prereleases are excluded.
5. The files and counters will appear on the dataset page after the cache refresh. Counts update periodically; allow approximately 15–30 minutes.

The names above are conventions, not files that already exist. No placeholder release or fabricated dataset is created by this feature.

To add another member, add its metadata to the series' `members` array, give it unique tag and asset prefixes under the series prefixes above, and use `<DatasetDownloads slug="the-dataset-slug" />` on its page. The read-only endpoint accepts registered series and member slugs. Use `kind="series"` on the series counter; the same component with `compact` shows the catalog total.

## What is counted

- Download counts for matching uploaded dataset assets across stable public releases.
- Supported extensions: CSV, TSV, XLSX, JSON, Parquet, ZIP, DTA, SAV, RDS.
- Downloads directly from GitHub are included too.
- Page visits, email access inquiries, citation copies, documentation files without the data prefix, and GitHub's generated source archives are excluded.

These are file-download counts reported by GitHub. They can include repeat downloads and automated traffic; they do not measure unique people or prove a completed local save. Deleting or replacing release assets can remove or reset their counts. Keep old assets to retain the release history. Files hosted elsewhere are not included.

No releases means **not released**, rather than a fabricated zero. A published file with no downloads legitimately shows zero. If GitHub is unavailable, the site shows an unavailable state and keeps the dataset page usable.

## Implementation and checks

The read-only endpoints include `/api/downloads/us-china-engagement` for the series and `/api/downloads/us-china-engagement-trump1` for the first dataset. They validate catalog slugs, paginate release history, cache shared public API responses, and never increment a counter on page view. Download links point directly to GitHub release assets; no file proxy or browser tracking cookie is added.

Run `node --test tests/dataset-downloads.test.cjs`. Tests use fixtures and mock requests only; they do not publish releases or download files.

GitHub reference: [Release asset API and download counts](https://docs.github.com/en/rest/releases/assets).
