export const SITE_URL = "https://traceweave.org";
export const DOCS_URL = "https://docs.traceweave.org";
export const SPEC_REPO_URL = "https://github.com/connorburgess/traceweave-spec";
export const SPEC_BRANCH = "roadmap-v2";
export const SPEC_BLOB_BASE = `${SPEC_REPO_URL}/blob/${SPEC_BRANCH}`;
export const SPEC_TREE_URL = `${SPEC_REPO_URL}/tree/${SPEC_BRANCH}`;
export const SPEC_ISSUES_URL = `${SPEC_REPO_URL}/issues`;

export function specUrl(path: string, anchor?: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  const suffix = anchor ? `#${anchor}` : "";
  return `${SPEC_BLOB_BASE}/${cleanPath}${suffix}`;
}

export interface CitedNumber {
  /** Exact token or figure displayed on the site */
  value: string;
  /** Exact substring expected in the cited specification file */
  sourceMatch?: string;
}

export interface CitedFact {
  id: string;
  sourcePath: string;
  anchor?: string;
  label: string;
  numbers: Array<string | CitedNumber>;
}
