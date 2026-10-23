# Dataset versions and archive

The Trump dataset has a permanent landing page for its current release and an archive for every published version:

- Current dataset: `/data/us-china-engagement/trump-first-administration`
- All versions: `/data/us-china-engagement/trump-first-administration/versions`
- Version 1.0.0: `/data/us-china-engagement/trump-first-administration/versions/1.0.0`
- Version 2.0.0: `/data/us-china-engagement/trump-first-administration/versions/2.0.0`

The archive includes the current version, **2.0.0**, published October 23, 2026 with 1,450 retained records, all included in the default count. Version 1.0.0 remains accessible with its original 745 retained, 719 included, and 26 excluded records. Uploading files to GitHub alone does not change the site's current version or add a version page automatically.

At the owner's explicit request, 35 Record IDs were corrected within the existing 2.0.0 release on October 23, 2026. All other Master data fields and record counts are unchanged. The same release, tag, version number, and file URLs are retained; the files and checksums were refreshed without adding a version or archiving the earlier 2.0.0 files.

## What a version preserves

`lib/datasets.ts` contains published release snapshots in `trumpFirstAdministrationDataset.releases`, newest first. Each snapshot records the version number, publication date, GitHub tag and release URL, permanent site path, license, exact file URLs, retained/included/excluded record counts, data-field count, English and Chinese release notes, citation, and BibTeX. The dataset's `release` points to the current snapshot. Count data fields from the released Master table's header; both existing releases contain 22 fields.

The current release also records **30,193 populated data cells**: count non-empty cells across the 1,450 Master records and all 22 fields, excluding the header. Identifiers, notes, and repeated values are included; empty cells are excluded. This measures populated cells, not independent observations. Recalculate this metadata when data changes. Landing and current dataset pages show records alongside populated cells; field count is the fallback for a release without that metric. Releases with exclusions preserve separate retained/included figures.

Per-version pages are immutable publication snapshots: preserve their metadata, counts, citations, and files when publishing a successor. Each has its own canonical URL and version-specific citation. The main dataset URL continues to present the current release. Cite the permanent page for the exact version used in an analysis so that readers can obtain the same data later.

Archive pages render the registered file links directly. Access to earlier versions does not depend on JavaScript download counters or on the GitHub statistics API being available. The data files themselves remain hosted as GitHub Release assets.

## Publish the next Trump dataset version

1. Prepare the final data files, codebook, methodology, license, and release notes. Choose a new version number, and verify its retained, included, and excluded record counts. Do not change the existing version's files to contain the new data.
2. Create a **new GitHub Release** with tag `us-china-engagement-trump1-vVERSION`, replacing `VERSION` with the new number. Use new asset names such as `us-china-engagement-data-trump1-vVERSION.csv`, `.xlsx`, and `.zip`. Include the codebook, license, and counting guidance in the release package. A draft release can be used while preparing the files.
3. Publish the stable public release and check every intended download URL. Confirm that the CSV, workbook, and complete package contain the intended version and agree with the publication metadata. Drafts and prereleases are excluded from download statistics.
4. Prepend a new complete `DatasetRelease` snapshot to the releases list in `lib/datasets.ts`. Use only confirmed published files. Record the actual publication date, counts, bilingual change notes, and version-specific citation. Point its `path` at the new `/versions/VERSION` page. Keep every earlier snapshot intact.
5. The first snapshot automatically becomes the current `release`; counts, citation, and search metadata follow it. Update any release-specific explanatory copy or documentation. Check that the current page, archive, new version page, and older version pages show the appropriate counts, notes, citations, and file URLs.
6. Run the repository's relevant dataset and search-discovery tests, TypeScript checks, and production build before deploying the site. Verify the deployed archive links and both languages.

For normal updates, create a new release and preserve previous tags, assets, and version pages. An in-place correction to the current release requires an explicit owner instruction, as with the 2.0.0 ID correction above. Keep archived releases intact. GitHub permits owners to alter or delete assets; the site's archive relies on keeping those published releases intact. Deleting or replacing assets can also lose or reset download counts.

## Download totals

Dataset and permanent version pages show counts only for the selected release's registered files. Series and catalog totals include only the current published release of each registered member. A new release starts with new GitHub assets and fresh counters; old assets and their historical counters remain accessible on their version pages. No counter is forcibly zeroed or frozen, and an unavailable statistics response is not displayed as zero. The archive identifies each version separately; it is not a list inferred from the counters. A new version must be registered explicitly even if GitHub already reports its download counts.

See [DOWNLOAD_TRACKING.md](./DOWNLOAD_TRACKING.md) for asset naming, supported formats, counter caching, and the distinction between file downloads and unique visitors.
