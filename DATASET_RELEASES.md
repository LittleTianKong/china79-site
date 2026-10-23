# Dataset versions and archive

The Trump dataset has a permanent landing page for its current release and an archive for every published version:

- Current dataset: `/data/us-china-engagement/trump-first-administration`
- All versions: `/data/us-china-engagement/trump-first-administration/versions`
- Version 1.0.0: `/data/us-china-engagement/trump-first-administration/versions/1.0.0`

The archive includes the current version. Version 1.0.0 remains current until a later public release is verified and registered. Uploading files to GitHub alone does not change the site's current version or add a version page automatically.

## What a version preserves

`lib/datasets.ts` contains published release snapshots in `trumpFirstAdministrationDataset.releases`, newest first. Each snapshot records the version number, publication date, GitHub tag and release URL, permanent site path, license, exact file URLs, retained/included/excluded record counts, English and Chinese release notes, citation, and BibTeX. The dataset's `release` points to the current snapshot.

Per-version pages are immutable publication snapshots: preserve their metadata, counts, citations, and files when publishing a successor. Each has its own canonical URL and version-specific citation. The main dataset URL continues to present the current release. Cite the permanent page for the exact version used in an analysis so that readers can obtain the same data later.

Archive pages render the registered file links directly. Access to earlier versions does not depend on JavaScript download counters or on the GitHub statistics API being available. The data files themselves remain hosted as GitHub Release assets.

## Publish the next Trump dataset version

1. Prepare the final data files, codebook, methodology, license, and release notes. Choose a new version number, and verify its retained, included, and excluded record counts. Do not change the existing version's files to contain the new data.
2. Create a **new GitHub Release** with tag `us-china-engagement-trump1-vVERSION`, replacing `VERSION` with the new number. Use new asset names such as `us-china-engagement-data-trump1-vVERSION.csv`, `.xlsx`, and `.zip`. Include the codebook, license, and counting guidance in the release package. A draft release can be used while preparing the files.
3. Publish the stable public release and check every intended download URL. Confirm that the CSV, workbook, and complete package contain the intended version and agree with the publication metadata. Drafts and prereleases are excluded from download statistics.
4. Prepend a new complete `DatasetRelease` snapshot to the releases list in `lib/datasets.ts`. Use only confirmed published files. Record the actual publication date, counts, bilingual change notes, and version-specific citation. Point its `path` at the new `/versions/VERSION` page. Keep every earlier snapshot intact.
5. The first snapshot automatically becomes the current `release`; counts, citation, and search metadata follow it. Update any release-specific explanatory copy or documentation. Check that the current page, archive, new version page, and older version pages show the appropriate counts, notes, citations, and file URLs.
6. Run the repository's relevant dataset and search-discovery tests, TypeScript checks, and production build before deploying the site. Verify the deployed archive links and both languages.

Never reuse an old release tag, replace an older asset, delete a previous release, or redirect its version page to the current version. Corrections to published data require another version. GitHub permits owners to alter or delete assets; the site's archive relies on keeping those published releases intact. Deleting or replacing assets can also lose or reset download counts.

## Download totals

Dataset and permanent version pages show counts only for the selected release's registered files. Series totals continue to include matching data files across all stable public versions. The archive identifies each version separately; it is not a list inferred from the counters. A new version must be registered explicitly even if GitHub already reports its download counts.

See [DOWNLOAD_TRACKING.md](./DOWNLOAD_TRACKING.md) for asset naming, supported formats, counter caching, and the distinction between file downloads and unique visitors.
