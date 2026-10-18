export type DownloadSource = {
  owner: string;
  repository: string;
  tagPrefix: string;
  assetPrefix: string;
};

export type DatasetDownloadFile = {
  id: number;
  name: string;
  version: string;
  count: number;
  size: number;
  format: string;
  url: string;
};

export type DatasetDownloadStats = {
  status: "available" | "unreleased";
  total: number | null;
  files: DatasetDownloadFile[];
  releasesUrl: string;
  checkedAt: string | null;
};

const formats = new Set(["csv", "tsv", "xlsx", "json", "parquet", "zip", "dta", "sav", "rds"]);
const integer = (value: unknown): value is number => Number.isSafeInteger(value) && (value as number) >= 0;

// GitHub counts release-asset downloads durably, including downloads outside the website.
// Page visits, citation copies, source archives, and documentation are not counted here.
export function summarizeDownloads(releases: unknown[], source: DownloadSource): DatasetDownloadStats {
  const base = `https://github.com/${source.owner}/${source.repository}`;
  const files: DatasetDownloadFile[] = [];
  const seen = new Set<number>();
  for (const raw of releases) {
    if (!raw || typeof raw !== "object") throw new Error("Invalid release response");
    const release = raw as Record<string, unknown>;
    if (release.draft !== false || release.prerelease !== false || typeof release.tag_name !== "string" || !release.tag_name.startsWith(source.tagPrefix)) continue;
    if (!Array.isArray(release.assets)) throw new Error("Invalid asset response");
    for (const rawAsset of release.assets) {
      if (!rawAsset || typeof rawAsset !== "object") throw new Error("Invalid asset");
      const asset = rawAsset as Record<string, unknown>;
      if (typeof asset.name !== "string" || !asset.name.startsWith(source.assetPrefix) || asset.state !== "uploaded") continue;
      const format = asset.name.split(".").pop()?.toLowerCase() ?? "";
      if (!formats.has(format)) continue;
      if (!integer(asset.id) || !integer(asset.download_count) || !integer(asset.size)) throw new Error("Invalid download count");
      if (seen.has(asset.id)) continue;
      seen.add(asset.id);
      files.push({
        id: asset.id, name: asset.name,
        version: release.tag_name.slice(source.tagPrefix.length),
        count: asset.download_count, size: asset.size, format: format.toUpperCase(),
        url: `${base}/releases/download/${encodeURIComponent(release.tag_name)}/${encodeURIComponent(asset.name)}`,
      });
    }
  }
  const total = files.reduce((sum, file) => sum + file.count, 0);
  if (!Number.isSafeInteger(total)) throw new Error("Invalid total");
  return { status: files.length ? "available" : "unreleased", total: files.length ? total : null, files, releasesUrl: `${base}/releases`, checkedAt: null };
}

export async function getDatasetDownloads(source: DownloadSource): Promise<DatasetDownloadStats> {
  const releases: unknown[] = [];
  let checkedAt: number | null = null;
  let hasEveryTimestamp = true;
  // Public API + shared fetch cache; no credentials or visitor identifiers required.
  // Fail rather than display a partial total if the response is incomplete.
  for (let page = 1; page <= 50; page++) {
    const response = await fetch(`https://api.github.com/repos/${source.owner}/${source.repository}/releases?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "China79-download-statistics" },
      next: { revalidate: 300 }, signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Download statistics unavailable");
    // Use the provider response date, so reading a cached response cannot make
    // an old total look as if it was just checked against GitHub.
    const responseDate = Date.parse(response.headers.get("date") ?? "");
    if (Number.isFinite(responseDate)) checkedAt = checkedAt === null ? responseDate : Math.min(checkedAt, responseDate);
    else hasEveryTimestamp = false;
    const items: unknown = await response.json();
    if (!Array.isArray(items)) throw new Error("Invalid releases");
    releases.push(...items);
    if (!response.headers.get("link")?.includes('rel="next"')) return {
      ...summarizeDownloads(releases, source),
      checkedAt: hasEveryTimestamp && checkedAt !== null ? new Date(checkedAt).toISOString() : null,
    };
  }
  throw new Error("Incomplete release history");
}
