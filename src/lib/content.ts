import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { FACT_VALUES } from "@/data/facts";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/* -------------------------------------------------------------------------- */
/* Shared primitive schemas                                                    */
/* -------------------------------------------------------------------------- */

const ActionSchema = z
  .object({
    label: z.string().min(1),
    href: z.string().min(1),
    variant: z.enum(["primary", "secondary"]),
  })
  .strict();

const NavItemSchema = z
  .object({
    label: z.string().min(1),
    href: z.string().min(1),
  })
  .strict();

const SimpleCardSchema = z
  .object({
    title: z.string().min(1),
    eyebrow: z.string().min(1).optional(),
    badge: z.string().min(1).optional(),
    badgeTone: z.enum(["default", "active", "caution"]).optional(),
    titleMono: z.boolean().optional(),
    paragraphs: z.array(z.string().min(1)).optional(),
    items: z.array(z.string().min(1)).optional(),
    footer: z.string().min(1).optional(),
    actions: z.array(ActionSchema).optional(),
  })
  .strict();

const StatItemSchema = z
  .object({
    value: z.string().min(1),
    label: z.string().min(1),
  })
  .strict();

/* -------------------------------------------------------------------------- */
/* Discriminated section schemas                                              */
/* -------------------------------------------------------------------------- */

const HeroSectionSchema = z
  .object({
    type: z.literal("hero"),
    heading: z.string().min(1),
    leads: z.array(z.string().min(1)).min(1),
    actions: z.array(ActionSchema).min(1),
    statusLabel: z.string().min(1),
    statusBody: z.string().min(1),
    statusSources: z.string().min(1),
  })
  .strict();

const PageHeaderSectionSchema = z
  .object({
    type: z.literal("page-header"),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    lead: z.string().min(1),
    body: z.string().min(1).optional(),
    maintainedByLabel: z.string().min(1).optional(),
    maintainedByName: z.string().min(1).optional(),
    maintainedByHref: z.string().min(1).optional(),
  })
  .strict();

const WorkflowSectionSchema = z
  .object({
    type: z.literal("workflow"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    linkText: z.string().min(1),
    linkHref: z.string().min(1),
  })
  .strict();

const EvidenceScopeSectionSchema = z
  .object({
    type: z.literal("evidence-scope"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    cards: z.array(SimpleCardSchema).length(2),
    provenance: z
      .object({
        heading: z.string().min(1),
        lead: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
        footer: z.string().min(1),
      })
      .strict(),
  })
  .strict();

const AudienceSectionSchema = z
  .object({
    type: z.literal("audience"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    cards: z
      .array(
        z
          .object({
            role: z.string().min(1),
            summary: z.string().min(1),
          })
          .strict()
      )
      .length(5),
  })
  .strict();

const ProgressSectionSchema = z
  .object({
    type: z.literal("progress"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    stats: z.array(StatItemSchema).min(1),
    actions: z.array(ActionSchema).min(1),
  })
  .strict();

const PipelineSectionSchema = z
  .object({
    type: z.literal("pipeline"),
    id: z.string().min(1),
    heading: z.string().min(1),
    stages: z.array(SimpleCardSchema).length(3),
  })
  .strict();

const WorkedExampleSectionSchema = z
  .object({
    type: z.literal("worked-example"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    referenceTitle: z.string().min(1),
    referenceMeta: z.string().min(1),
    candidateTitle: z.string().min(1),
    candidateMeta: z.string().min(1),
    reportHeading: z.string().min(1),
    tableHeaders: z.array(z.string().min(1)).length(6),
    calloutParagraphs: z.array(z.string().min(1)).min(1),
    companionsHeading: z.string().min(1),
    companions: z.array(SimpleCardSchema).length(2),
  })
  .strict();

const LayersSectionSchema = z
  .object({
    type: z.literal("layers"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    tableHeaders: z.array(z.string().min(1)).length(3),
    rows: z
      .array(
        z
          .object({
            layer: z.string().min(1),
            records: z.string().min(1),
            status: z.string().min(1),
            statusTone: z.enum(["default", "active", "caution"]),
          })
          .strict()
      )
      .min(1),
    actions: z.array(ActionSchema).min(1),
  })
  .strict();

const CoverageMatrixSectionSchema = z
  .object({
    type: z.literal("coverage-matrix"),
    id: z.string().min(1),
    heading: z.string().min(1),
    tableHeaders: z.array(z.string().min(1)).length(4),
    rows: z
      .array(
        z
          .object({
            kind: z.string().min(1),
            profiles: z.string().min(1),
            status: z.string().min(1),
            statusTone: z.enum(["active", "specified", "researched", "unstarted"]),
            summary: z.string().min(1),
            sourcePath: z.string().min(1),
            anchor: z.string().min(1).optional(),
          })
          .strict()
      )
      .min(1),
    noteHeading: z.string().min(1),
    noteBody: z.string().min(1),
  })
  .strict();

const PlannedExtensionsSectionSchema = z
  .object({
    type: z.literal("planned-extensions"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    cards: z
      .array(
        z
          .object({
            title: z.string().min(1),
            status: z.string().min(1),
            gates: z.string().min(1),
            summary: z.string().min(1),
            sourcePath: z.string().min(1),
            anchor: z.string().min(1).optional(),
          })
          .strict()
      )
      .min(1),
    actions: z.array(ActionSchema).min(1),
  })
  .strict();

const StatSectionSchema = z
  .object({
    type: z.literal("stat-section"),
    id: z.string().min(1),
    tight: z.boolean().optional(),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    columns: z.union([z.literal(3), z.literal(4)]),
    stats: z.array(StatItemSchema).min(1),
    outro: z.string().min(1),
  })
  .strict();

const ProseSectionSchema = z
  .object({
    type: z.literal("prose-section"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    actions: z.array(ActionSchema).optional(),
  })
  .strict();

const CardPairSectionSchema = z
  .object({
    type: z.literal("card-pair"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    cards: z.array(SimpleCardSchema).length(2),
  })
  .strict();

const ImageFpTableSectionSchema = z
  .object({
    type: z.literal("image-fp-table"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    tableHeaders: z.array(z.string().min(1)).length(3),
    outro: z.string().min(1),
  })
  .strict();

const GateRulesSectionSchema = z
  .object({
    type: z.literal("gate-rules"),
    id: z.string().min(1),
    heading: z.string().min(1),
    cards: z
      .array(
        z
          .object({
            title: z.string().min(1),
            body: z.string().min(1),
          })
          .strict()
      )
      .length(3),
    countsHeading: z.string().min(1),
    countsIntro: z.string().min(1),
    countsHeaders: z.array(z.string().min(1)).length(6),
  })
  .strict();

const MilestonesTableSectionSchema = z
  .object({
    type: z.literal("milestones-table"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    tableHeaders: z.array(z.string().min(1)).length(4),
    rows: z
      .array(
        z
          .object({
            id: z.string().min(1),
            name: z.string().min(1),
            gates: z.string().min(1),
            status: z.string().min(1),
            summary: z.string().min(1),
          })
          .strict()
      )
      .min(1),
  })
  .strict();

const TracksTableSectionSchema = z
  .object({
    type: z.literal("tracks-table"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    tableHeaders: z.array(z.string().min(1)).length(3),
    rows: z
      .array(
        z
          .object({
            track: z.string().min(1),
            scope: z.string().min(1),
            state: z.string().min(1),
          })
          .strict()
      )
      .min(1),
    actions: z.array(ActionSchema).min(1),
    footerLinkText: z.string().min(1),
    footerLinkHref: z.string().min(1),
  })
  .strict();

const GovernanceGridSectionSchema = z
  .object({
    type: z.literal("governance-grid"),
    id: z.string().min(1),
    cards: z.array(SimpleCardSchema).length(2),
  })
  .strict();

const LicensingSectionSchema = z
  .object({
    type: z.literal("licensing"),
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
    notes: z.array(z.string().min(1)).min(1),
    actions: z.array(ActionSchema).min(1),
  })
  .strict();

export const SectionSchema = z.discriminatedUnion("type", [
  HeroSectionSchema,
  PageHeaderSectionSchema,
  WorkflowSectionSchema,
  EvidenceScopeSectionSchema,
  AudienceSectionSchema,
  ProgressSectionSchema,
  PipelineSectionSchema,
  WorkedExampleSectionSchema,
  LayersSectionSchema,
  CoverageMatrixSectionSchema,
  PlannedExtensionsSectionSchema,
  StatSectionSchema,
  ProseSectionSchema,
  CardPairSectionSchema,
  ImageFpTableSectionSchema,
  GateRulesSectionSchema,
  MilestonesTableSectionSchema,
  TracksTableSectionSchema,
  GovernanceGridSectionSchema,
  LicensingSectionSchema,
]);

export type PageSection = z.infer<typeof SectionSchema>;
export type ActionItem = z.infer<typeof ActionSchema>;
export type SimpleCard = z.infer<typeof SimpleCardSchema>;

const PageFrontMatterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    canonical: z.string().min(1),
    sections: z.array(SectionSchema).min(1),
  })
  .strict();

export type PageContent = z.infer<typeof PageFrontMatterSchema> & {
  body: string;
};

/* -------------------------------------------------------------------------- */
/* Shared site header & footer schemas                                        */
/* -------------------------------------------------------------------------- */

const SiteHeaderSchema = z
  .object({
    brandName: z.string().min(1),
    navItems: z.array(NavItemSchema).min(1),
    docsLabel: z.string().min(1),
    docsHref: z.string().min(1),
  })
  .strict();

export type SiteHeaderContent = z.infer<typeof SiteHeaderSchema>;

const SiteFooterSchema = z
  .object({
    brandName: z.string().min(1),
    statusLine: z.string().min(1),
    summary: z.string().min(1),
    pagesHeading: z.string().min(1),
    pageLinks: z.array(NavItemSchema).min(1),
    sourcesHeading: z.string().min(1),
    sourceLinks: z.array(NavItemSchema).min(1),
    maintainerName: z.string().min(1),
    maintainerHref: z.string().min(1),
    copyrightLine: z.string().min(1),
    licenceLine: z.string().min(1),
  })
  .strict();

export type SiteFooterContent = z.infer<typeof SiteFooterSchema>;

/* -------------------------------------------------------------------------- */
/* Front-matter parser & fact verification                                    */
/* -------------------------------------------------------------------------- */

function splitFrontMatter(raw: string, relPath: string): { data: unknown; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Invalid content file ${relPath}: missing YAML front matter delimiters (---).`);
  }
  const yamlSource = match[1];
  const body = match[2].trim();
  let data: unknown;
  try {
    data = parseYaml(yamlSource);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`YAML parse error in ${relPath}: ${msg}`);
  }
  return { data, body };
}

function verifyFactTokens(value: unknown, relPath: string): void {
  if (typeof value === "string") {
    for (const m of value.matchAll(/\{\{(?:fact|code):([^}]+)\}\}/g)) {
      const key = m[1].trim();
      if (!(key in FACT_VALUES)) {
        throw new Error(`Unknown fact key "${key}" referenced in ${relPath}.`);
      }
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) verifyFactTokens(item, relPath);
    return;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value)) verifyFactTokens(v, relPath);
  }
}

function loadValidated<T>(relPath: string, schema: z.ZodType<T>): T & { body: string } {
  const fullPath = path.join(CONTENT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing content file: content/${relPath}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, body } = splitFrontMatter(raw, `content/${relPath}`);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Schema validation failed for content/${relPath}:\n${details}`);
  }
  verifyFactTokens(parsed.data, `content/${relPath}`);
  verifyFactTokens(body, `content/${relPath}`);
  return { ...parsed.data, body };
}

/* -------------------------------------------------------------------------- */
/* Public loaders (build-time static reads)                                   */
/* -------------------------------------------------------------------------- */

export function getPageContent(
  slug: "home" | "how-it-works" | "coverage" | "evidence" | "roadmap" | "about"
): PageContent {
  return loadValidated(`pages/${slug}.md`, PageFrontMatterSchema);
}

export function getSiteHeaderContent(): SiteHeaderContent {
  const { body: _body, ...data } = loadValidated("site/header.md", SiteHeaderSchema);
  void _body;
  return data;
}

export function getSiteFooterContent(): SiteFooterContent {
  const { body: _body, ...data } = loadValidated("site/footer.md", SiteFooterSchema);
  void _body;
  return data;
}

export function expandFacts(text: string): string {
  return text.replace(/\{\{fact:([^}]+)\}\}/g, (_match, rawKey: string) => {
    const key = rawKey.trim();
    if (!(key in FACT_VALUES)) {
      throw new Error(`Unknown fact key "${key}".`);
    }
    return FACT_VALUES[key];
  });
}
