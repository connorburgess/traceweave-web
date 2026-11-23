#!/usr/bin/env node
/**
 * Content, source-traceability, and honesty verification script.
 *
 * Fails if:
 *  1. Any GitHub spec link or SourceLink path does not exist in the public
 *     specification checkout.
 *  2. Any registered numerical claim in src/data/facts.ts is missing from its
 *     cited file in the public specification checkout.
 *  3. Any forbidden phrase, absolute home-directory path, personal email, or
 *     AI-attribution trailer appears in tracked files.
 *  4. Any numeric figure displayed in a page component is not accounted for in
 *     either CITED_FACTS or the small allowlist of non-metric UI/structural
 *     numbers (such as 404, 1.0, CSS sizes, or section/step indices).
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const SPEC_BLOB_PREFIX =
  "https://github.com/connorburgess/traceweave-spec/blob/roadmap-v2/";

function parseArgs(argv) {
  let specDir = process.env.TRACEWEAVE_SPEC_DIR || "";
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--spec-dir" && argv[i + 1]) {
      specDir = argv[i + 1];
      i += 1;
    }
  }
  if (!specDir) {
    const sibling = path.resolve(REPO_ROOT, "..", "traceweave-spec-public-wt");
    if (fs.existsSync(sibling)) {
      specDir = sibling;
    }
  }
  return { specDir };
}

function walkFiles(dir, extensions, ignoreDirs = new Set()) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, extensions, ignoreDirs));
    } else if (extensions.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

const ALLOWED_COPYRIGHT_NAMES = new Set([
  "Seatbelt Labs",
  "Traceweave contributors",
]);

const ALLOWED_EXTERNAL_HOSTS = new Set([
  "traceweave.org",
  "docs.traceweave.org",
  "github.com",
  "seatbeltlabs.com",
  "schema.org",
  "creativecommons.org",
  "www.apache.org",
  "www.w3.org",
]);

const ALLOWED_EMAILS = new Set(["connor@seatbeltlabs.com"]);

const ALLOWED_EMAIL_FILES = new Set([
  path.join("src", "app", "about", "page.tsx"),
  path.join("src", "components", "SiteFooter.tsx"),
]);

const FORBIDDEN_PATTERNS = [
  { label: 'forbidden phrase "proves ownership"', regex: /\bproves?\s+ownership\b/i },
  { label: 'forbidden phrase "proof of ownership"', regex: /\bproof\s+of\s+ownership\b/i },
  { label: 'forbidden claim "protects your work"', regex: /\bprotects?\s+your\s+work\b/i },
  { label: 'forbidden word "protects"', regex: /\bprotects\b/i },
  { label: 'forbidden phrase "detects plagiarism"', regex: /\bdetects?\s+plagiarism\b/i },
  { label: 'forbidden word "guarantee"', regex: /\bguarantees?\b|\bguaranteed\b|\bguaranteeing\b/i },
  { label: 'forbidden word "tamper-proof"', regex: /\btamper[\s-]?proof\b/i },
  { label: 'forbidden entity label "nonprofit"', regex: /\bnon[\s-]?profit\b/i },
  { label: 'forbidden entity label "foundation"', regex: /\bfoundation\b/i },
  { label: 'litigation/DRM framing ("DRM")', regex: /\bDRM\b/ },
  { label: 'litigation framing ("infringement")', regex: /\binfringement\b/i },
  {
    label: "absolute home-directory path",
    regex: /\/Users\/[A-Za-z0-9._-]+|\/home\/[A-Za-z0-9._-]+|[A-Za-z]:\\Users\\[A-Za-z0-9._-]+/,
  },
  {
    label: "AI attribution or generator credit",
    regex: /\bco-authored-by\b|\bgenerated\s+by\s+(claude|chatgpt|gpt|gemini|copilot|cursor|codex)\b/i,
  },
  {
    label: "JSON-LD Organization entity claim",
    regex: /"@type"\s*:\s*"Organization"/,
  },
];

function extractCitedFacts(factsSource) {
  const startIdx = factsSource.indexOf("export const CITED_FACTS");
  if (startIdx === -1) {
    throw new Error("Could not locate CITED_FACTS in src/data/facts.ts");
  }
  const block = factsSource.slice(startIdx);
  const arrayStart = block.indexOf("= [");
  const arrayEnd = block.indexOf("\n];", arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error("Could not parse CITED_FACTS array bounds in src/data/facts.ts");
  }
  const literal = block.slice(arrayStart + 2, arrayEnd + 2);
  const facts = new Function(`"use strict"; return (${literal});`)();
  if (!Array.isArray(facts) || !facts.length) {
    throw new Error("CITED_FACTS did not evaluate to a non-empty array");
  }
  return facts;
}

function collectNumericTokens(text) {
  // Match numbers (integers, comma-grouped thousands, decimals, percentages)
  // outside identifiers like M2.5, UC-1, draft-1, e-img-f-2, etc.
  const tokens = new Set();
  const matches = text.matchAll(/(?<![A-Za-z0-9._-])(\d+(?:,\d{3})*(?:\.\d+)?%?)(?![A-Za-z0-9._-])/g);
  for (const m of matches) {
    tokens.add(m[1]);
  }
  return tokens;
}

function stripNonVisibleTsx(source) {
  // Remove import lines, style={{ ... }} objects, metadata blocks, and comments
  // so page-number verification targets rendered copy.
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/.*$/gm, " ")
    .replace(/^\s*import\s+.*$/gm, " ")
    .replace(/style=\{\{[^}]*\}\}/g, " ")
    .replace(/className="[^"]*"/g, " ");
}

function main() {
  const { specDir } = parseArgs(process.argv);
  const errors = [];

  if (!specDir || !fs.existsSync(specDir)) {
    console.error(
      "FAIL: Public specification checkout not found. Pass --spec-dir <path> or set TRACEWEAVE_SPEC_DIR."
    );
    process.exit(1);
  }

  const ignoreDirs = new Set([
    "node_modules",
    ".next",
    "out",
    ".git",
    ".spec-checkout",
    "LICENSES",
  ]);
  const textExts = new Set([".ts", ".tsx", ".mjs", ".js", ".css", ".md", ".yml", ".yaml"]);
  const allFiles = walkFiles(REPO_ROOT, textExts, ignoreDirs);

  // 1. Forbidden phrases, absolute home paths, emails, AI credits, and copyright/name allow-list.
  const selfRel = path.join("scripts", "check-content.mjs");
  const copyrightRe = /(?:©|Copyright)\s+\d{4}\s+([^·.\n<]+)/g;
  const emailRe = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  for (const file of allFiles) {
    const rel = path.relative(REPO_ROOT, file);
    if (rel === selfRel) continue;
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split(/\r?\n/);
    for (let idx = 0; idx < lines.length; idx += 1) {
      const line = lines[idx];
      for (const rule of FORBIDDEN_PATTERNS) {
        if (rule.regex.test(line)) {
          errors.push(`${rel}:${idx + 1}: ${rule.label} -> ${line.trim()}`);
        }
      }
      emailRe.lastIndex = 0;
      let em;
      while ((em = emailRe.exec(line)) !== null) {
        const addr = em[0].toLowerCase();
        if (!ALLOWED_EMAILS.has(addr)) {
          errors.push(`${rel}:${idx + 1}: disallowed email address "${em[0]}"`);
        } else if (!ALLOWED_EMAIL_FILES.has(rel)) {
          errors.push(
            `${rel}:${idx + 1}: allowed email address "${em[0]}" is only permitted on the About page and in the footer`
          );
        }
      }
      copyrightRe.lastIndex = 0;
      let cm;
      while ((cm = copyrightRe.exec(line)) !== null) {
        const holder = cm[1].trim();
        if (!holder || holder === '{" "}') continue;
        if (!ALLOWED_COPYRIGHT_NAMES.has(holder)) {
          errors.push(
            `${rel}:${idx + 1}: unlisted copyright holder "${holder}" (allowed: ${[...ALLOWED_COPYRIGHT_NAMES].join(", ")})`
          );
        }
      }
      if (/seatbelt labs/i.test(line)) {
        const isFooterFile = rel === path.join("src", "components", "SiteFooter.tsx");
        const isAboutFile = rel === path.join("src", "app", "about", "page.tsx");
        const footerValid =
          isFooterFile &&
          /<a[\s\S]*?href="https:\/\/seatbeltlabs\.com"[\s\S]*?<SeatbeltLabsMark \/>[\s\S]*?SEATBELT LABS[\s\S]*?<\/a>[\s\S]*?© 2026 Seatbelt Labs/.test(
            content
          );
        const aboutValid =
          isAboutFile &&
          /Maintained by[\s\S]*?<a[\s\S]*?href="https:\/\/seatbeltlabs\.com"[\s\S]*?<SeatbeltLabsMark \/>[\s\S]*?SEATBELT LABS[\s\S]*?<\/a>/.test(
            content
          );
        if (!footerValid && !aboutValid) {
          errors.push(
            `${rel}:${idx + 1}: "Seatbelt Labs" / "SEATBELT LABS" is permitted only in the footer credit and the About page "Maintained by" line`
          );
        }
      }
    }
  }

  // 1b. Check external URLs in src/ against ALLOWED_EXTERNAL_HOSTS and forbid tracking params.
  const srcFilesForUrls = walkFiles(path.join(REPO_ROOT, "src"), new Set([".ts", ".tsx"]));
  const urlRe = /https?:\/\/[^\s"'`)<>]+/g;
  for (const file of srcFilesForUrls) {
    const rel = path.relative(REPO_ROOT, file);
    const content = fs.readFileSync(file, "utf8");
    let m;
    while ((m = urlRe.exec(content)) !== null) {
      const rawUrl = m[0].replace(/[.,;]+$/, "");
      if (rawUrl.includes("${")) continue;
      try {
        const parsed = new URL(rawUrl);
        if (!ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname)) {
          errors.push(`${rel}: disallowed external host "${parsed.hostname}" in ${rawUrl}`);
        }
        for (const key of parsed.searchParams.keys()) {
          if (/^utm_|^ref$|^fbclid$|^gclid$/i.test(key)) {
            errors.push(`${rel}: tracking parameter "${key}" in ${rawUrl}`);
          }
        }
      } catch {
        errors.push(`${rel}: malformed URL "${rawUrl}"`);
      }
    }
  }

  // 2. Collect every cited spec path across src/ files.
  const srcFiles = walkFiles(path.join(REPO_ROOT, "src"), new Set([".ts", ".tsx"]));
  const citedPaths = new Map();

  const recordPath = (rawPath, fromFile) => {
    const clean = rawPath.split("#")[0].replace(/^\/+/, "");
    if (!clean) return;
    if (!citedPaths.has(clean)) citedPaths.set(clean, new Set());
    citedPaths.get(clean).add(fromFile);
  };

  const escapedPrefix = SPEC_BLOB_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fullUrlRe = new RegExp(`${escapedPrefix}([^"'\\s)\\x60]+)`, "g");
  const specUrlCallRe = /specUrl\(\s*["']([^"']+)["']/g;
  const sourcePathPropRe = /sourcePath:\s*["']([^"']+)["']/g;
  const sourceLinkPathRe = /<SourceLink[^>]*\bpath=["']([^"']+)["']/g;

  for (const file of srcFiles) {
    const rel = path.relative(REPO_ROOT, file);
    const content = fs.readFileSync(file, "utf8");
    for (const re of [fullUrlRe, specUrlCallRe, sourcePathPropRe, sourceLinkPathRe]) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(content)) !== null) {
        recordPath(match[1], rel);
      }
    }
  }

  if (citedPaths.size === 0) {
    errors.push("No cited specification paths found under src/.");
  }

  for (const [specRelPath, refs] of citedPaths.entries()) {
    const fullSpecPath = path.join(specDir, specRelPath);
    if (!fs.existsSync(fullSpecPath)) {
      errors.push(
        `Missing cited spec path "${specRelPath}" (referenced by ${[...refs].join(", ")})`
      );
    }
  }

  // 3. Verify every registered numerical claim in src/data/facts.ts exists in its cited spec file.
  const factsPath = path.join(REPO_ROOT, "src", "data", "facts.ts");
  const factsSource = fs.readFileSync(factsPath, "utf8");
  const citedFacts = extractCitedFacts(factsSource);
  const verifiedNumberTokens = new Set();
  let checkedNumbers = 0;

  for (const fact of citedFacts) {
    const fullSpecPath = path.join(specDir, fact.sourcePath);
    if (!fs.existsSync(fullSpecPath)) {
      errors.push(`CITED_FACTS "${fact.id}": missing sourcePath "${fact.sourcePath}"`);
      continue;
    }
    const specText = fs.readFileSync(fullSpecPath, "utf8");
    for (const item of fact.numbers) {
      checkedNumbers += 1;
      const displayVal = typeof item === "string" ? item : item.value;
      const needle = typeof item === "string" ? item : item.sourceMatch ?? item.value;
      if (!specText.includes(needle)) {
        errors.push(
          `CITED_FACTS "${fact.id}": token "${needle}" not found in "${fact.sourcePath}"`
        );
      }
      // Record every numeric sub-token verified by this entry.
      for (const num of displayVal.matchAll(/\d[\d,]*(?:\.\d+)?%?/g)) {
        verifiedNumberTokens.add(num[0]);
      }
    }
  }

  // 4. Cross-check numeric literals in page components against verified numbers
  //    plus a minimal set of structural/standard identifiers (e.g. RFC 3161,
  //    RFC 8785, CC BY 4.0, Apache 2.0, HTTP 404, section numbers 1–6).
  const STRUCTURAL_NUMBERS = new Set([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "1.0",
    "2.0",
    "4.0",
    "39",
    "404",
    "3161",
    "8785",
    "17.0.0",
  ]);
  const pageFiles = walkFiles(path.join(REPO_ROOT, "src", "app"), new Set([".tsx"])).filter(
    (f) => f.endsWith("page.tsx") || f.endsWith("not-found.tsx")
  );
  for (const pageFile of pageFiles) {
    const rel = path.relative(REPO_ROOT, pageFile);
    const cleaned = stripNonVisibleTsx(fs.readFileSync(pageFile, "utf8"));
    for (const token of collectNumericTokens(cleaned)) {
      if (!verifiedNumberTokens.has(token) && !STRUCTURAL_NUMBERS.has(token)) {
        errors.push(
          `${rel}: numeric value "${token}" is not backed by an entry in src/data/facts.ts CITED_FACTS`
        );
      }
    }
  }

  // 5. Ensure required licence instruments and brand mark exist, and that the
  //    multi-medium scope cited on the home page is backed by README.md and ROADMAP.md.
  for (const requiredFile of [
    "LICENSE.md",
    "LICENSES/Apache-2.0.txt",
    "LICENSES/CC-BY-4.0.txt",
    "public/brand/seatbelt-labs-mark.svg",
  ]) {
    if (!fs.existsSync(path.join(REPO_ROOT, requiredFile))) {
      errors.push(`Missing required file: ${requiredFile}`);
    }
  }

  const readmeText = fs.readFileSync(path.join(specDir, "README.md"), "utf8");
  const roadmapText = fs.readFileSync(path.join(specDir, "ROADMAP.md"), "utf8");
  if (!readmeText.includes("text, images, and audio")) {
    errors.push('README.md in spec checkout no longer lists "text, images, and audio"');
  }
  if (!roadmapText.includes("## Pilot languages") || !roadmapText.includes("## Later profiles and sequence")) {
    errors.push("ROADMAP.md in spec checkout missing expected pilot-languages or later-profiles sections");
  }

  // 6. Keep protocol names and gate IDs off the home page, ensure no status banner,
  //    and require the plain-text status sentence inside the "Where it stands today" block.
  const homeSource = fs.readFileSync(path.join(REPO_ROOT, "src", "app", "page.tsx"), "utf8");
  for (const term of ["DSSE", "in-toto", "RFC 3161", "M0–M5", "M4.", "M3.", "M2.", "UC-1", "status-strip"]) {
    if (homeSource.includes(term)) {
      errors.push(`src/app/page.tsx: disallowed term "${term}" on the home page`);
    }
  }
  const normalizedHome = homeSource.replace(/\s+/g, " ");
  if (
    !normalizedHome.includes("Where it stands today:") ||
    !normalizedHome.includes("It is experimental and not yet evaluated on real-world data.")
  ) {
    errors.push(
      'src/app/page.tsx: missing required plain-text status sentence in the "Where it stands today" block'
    );
  }

  if (errors.length > 0) {
    console.error(`FAIL: content check found ${errors.length} problem(s):`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(
    `PASS: checked ${allFiles.length} files, ${citedPaths.size} cited spec paths, ${checkedNumbers} source-backed figures, and ${pageFiles.length} page files against the specification checkout.`
  );
}

main();
