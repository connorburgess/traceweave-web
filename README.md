# Traceweave website (`traceweave.org`)

Static Next.js (App Router, TypeScript) website for the [Traceweave open specification](https://github.com/connorburgess/traceweave-spec/tree/roadmap-v2).

Deep reference documentation lives separately at [docs.traceweave.org](https://docs.traceweave.org).

## Status

Traceweave is an experimental design draft (`0.1.0-draft.1`), not a standard and not production software. Every factual claim and figure on this site links directly to its source file in the published `roadmap-v2` branch of `traceweave-spec`.

## Local development and checks

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
```

Run all verification checks:

```sh
npm run lint
npm run typecheck
npm run check:content -- --spec-dir /path/to/traceweave-spec-public-wt
npm run build
```

`npm run check:content` checks every cited `traceweave-spec` path and registered numerical claim against a local checkout of the `roadmap-v2` branch (passed via `--spec-dir`, `TRACEWEAVE_SPEC_DIR`, or a sibling `../traceweave-spec-public-wt` directory), and rejects forbidden claims, home-directory paths, and stray attribution markers.

## Static export

`npm run build` outputs a fully static site to `out/` with zero database, cookies, analytics, third-party scripts, external fonts, or API routes. Open Graph and Twitter card images, `sitemap.xml`, and `robots.txt` are generated at build time.

## Licences

Prose, page copy, diagrams, and Markdown documentation are licensed under [CC BY 4.0](LICENSES/CC-BY-4.0.txt). Source code, stylesheets, scripts, and configuration files are licensed under [Apache-2.0](LICENSES/Apache-2.0.txt). See [LICENSE.md](LICENSE.md).
