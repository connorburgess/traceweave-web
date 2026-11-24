import Link from "next/link";
import { ActionLinks, RichText } from "@/components/RichText";
import { SourceLink } from "@/components/SourceLink";
import { SpecimenPicture } from "@/components/SpecimenPicture";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import {
  HOME_HERO_SPECIMEN,
  IMAGE_FP_ROWS,
  MEDIUM_PLATES,
  PROVENANCE_SPECIMEN,
  ROADMAP_COUNTS,
  WORKED_EXAMPLE,
} from "@/data/facts";
import type { PageSection } from "@/lib/content";

function simpleBadgeClass(tone?: "default" | "active" | "caution"): string {
  if (tone === "active") return "badge badge-active";
  if (tone === "caution") return "badge badge-caution";
  return "badge";
}

function coverageBadgeClass(tone: "active" | "specified" | "researched" | "unstarted"): string {
  if (tone === "active") return "badge badge-active";
  if (tone === "researched") return "badge badge-caution";
  return "badge";
}

export function PageSections({ sections }: { sections: readonly PageSection[] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const key = `${section.type}-${idx}`;

        switch (section.type) {
          case "hero":
            return (
              <section key={key} className="hero">
                <div className="container">
                  <div className="hero-grid has-media">
                    <div className="hero-copy">
                      <h1>
                        <RichText text={section.heading} />
                      </h1>
                      {section.leads.map((lead, lIdx) => (
                        <p
                          key={lIdx}
                          className="lead"
                          style={lIdx === section.leads.length - 1 ? { marginBottom: 0 } : undefined}
                        >
                          <RichText text={lead} />
                        </p>
                      ))}
                      <ActionLinks actions={section.actions} />
                    </div>

                    <div className="hero-media">
                      <SpecimenPicture
                        base={HOME_HERO_SPECIMEN.light.base}
                        alt={HOME_HERO_SPECIMEN.light.alt}
                        sizes="(max-width: 860px) calc(100vw - 2rem), 380px"
                        priority
                        className="theme-img-light"
                      />
                      <SpecimenPicture
                        base={HOME_HERO_SPECIMEN.dark.base}
                        alt={HOME_HERO_SPECIMEN.dark.alt}
                        sizes="(max-width: 860px) calc(100vw - 2rem), 380px"
                        className="theme-img-dark"
                      />
                    </div>
                  </div>

                  <div
                    className="card-muted"
                    role="region"
                    aria-label="Current project status"
                    style={{ marginTop: "2rem" }}
                  >
                    <p style={{ marginBottom: "0.55rem" }}>
                      <strong>{section.statusLabel}</strong>{" "}
                      <RichText text={section.statusBody} />
                    </p>
                    <p style={{ marginBottom: 0, fontSize: "0.84rem" }}>
                      <RichText text={section.statusSources} />
                    </p>
                  </div>
                </div>
              </section>
            );

          case "page-header":
            return (
              <section key={key} className="page-header">
                <div className="container">
                  <div className="hero-copy">
                    <div className="eyebrow">{section.eyebrow}</div>
                    <h1>
                      <RichText text={section.heading} />
                    </h1>
                    <p
                      className="lead"
                      style={section.body ? undefined : { marginBottom: 0 }}
                    >
                      <RichText text={section.lead} />
                    </p>
                    {section.body ? (
                      <p>
                        <RichText text={section.body} />
                      </p>
                    ) : null}
                    {section.maintainedByLabel &&
                    section.maintainedByName &&
                    section.maintainedByHref ? (
                      <p className="maintained-by">
                        <span>{section.maintainedByLabel}</span>
                        <a
                          href={section.maintainedByHref}
                          rel="noopener noreferrer"
                          className="seatbelt-wordmark"
                        >
                          {section.maintainedByName}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>
            );

          case "workflow":
            return (
              <section key={key} className="section-tight" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>
                  <WorkflowDiagram />
                  <p style={{ marginBottom: 0 }}>
                    <Link href={section.linkHref}>{section.linkText}</Link>
                  </p>
                </div>
              </section>
            );

          case "evidence-scope":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="grid-2" style={{ marginTop: "1.25rem" }}>
                    {section.cards.map((card) => (
                      <div key={card.title} className="card">
                        <div className="card-title-row">
                          <h3 style={{ marginBottom: 0 }}>{card.title}</h3>
                          {card.badge ? (
                            <span className={simpleBadgeClass(card.badgeTone)}>
                              {card.badge}
                            </span>
                          ) : null}
                        </div>
                        {card.items ? (
                          <ul className="clean-list">
                            {card.items.map((item, i) => (
                              <li key={i}>
                                <RichText text={item} />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="card" style={{ marginTop: "1.25rem" }}>
                    <div className="provenance-grid">
                      <div className="provenance-copy">
                        <h3>{section.provenance.heading}</h3>
                        <p style={{ marginBottom: "0.9rem" }}>
                          <RichText text={section.provenance.lead} />
                        </p>
                        <ul className="clean-list">
                          {section.provenance.items.map((item, i) => (
                            <li key={i}>
                              <RichText text={item} />
                            </li>
                          ))}
                        </ul>
                        <p style={{ marginTop: "1rem", marginBottom: 0 }}>
                          <RichText text={section.provenance.footer} />
                        </p>
                      </div>
                      <div className="provenance-media">
                        <SpecimenPicture
                          base={PROVENANCE_SPECIMEN.base}
                          alt={PROVENANCE_SPECIMEN.alt}
                          sizes="(max-width: 860px) calc(100vw - 4.7rem), 340px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );

          case "audience":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="grid-5" style={{ marginTop: "1.25rem" }}>
                    {section.cards.map((item) => (
                      <div key={item.role} className="card">
                        <h3 style={{ marginBottom: "0.5rem" }}>{item.role}</h3>
                        <p style={{ marginBottom: 0 }}>
                          <RichText text={item.summary} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "progress":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="stat-grid">
                    {section.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="stat-card">
                        <div className="stat-value">
                          <RichText text={stat.value} />
                        </div>
                        <div className="stat-label">
                          <RichText text={stat.label} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <ActionLinks actions={section.actions} />
                </div>
              </section>
            );

          case "pipeline":
            return (
              <section key={key} className="section-tight" aria-labelledby={section.id}>
                <div className="container">
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <WorkflowDiagram />

                  <div className="grid-3" style={{ marginTop: "1.25rem" }}>
                    {section.stages.map((stage) => (
                      <div key={stage.title} className="card">
                        {stage.eyebrow ? <div className="eyebrow">{stage.eyebrow}</div> : null}
                        <h3>{stage.title}</h3>
                        {stage.paragraphs?.map((para, pIdx) => (
                          <p
                            key={pIdx}
                            style={
                              pIdx === (stage.paragraphs?.length ?? 0) - 1
                                ? { marginBottom: 0 }
                                : undefined
                            }
                          >
                            <RichText text={para} />
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "worked-example":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="grid-2" style={{ marginTop: "1.25rem" }}>
                    <div>
                      <h3>
                        <RichText text={section.referenceTitle} />
                      </h3>
                      <p style={{ fontSize: "0.88rem" }}>
                        <RichText text={section.referenceMeta} />
                      </p>
                      <pre>
                        <code>{WORKED_EXAMPLE.reference.code}</code>
                      </pre>
                    </div>

                    <div>
                      <h3>
                        <RichText text={section.candidateTitle} />
                      </h3>
                      <p style={{ fontSize: "0.88rem" }}>
                        <RichText text={section.candidateMeta} />
                      </p>
                      <pre>
                        <code>{WORKED_EXAMPLE.candidate.code}</code>
                      </pre>
                    </div>
                  </div>

                  <h3 style={{ marginTop: "1rem" }}>{section.reportHeading}</h3>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.tableHeaders.map((hdr) => (
                            <th key={hdr} scope="col">
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="mono">exact</td>
                          <td className="mono">{WORKED_EXAMPLE.exact.outcome}</td>
                          <td className="num">{WORKED_EXAMPLE.exact.referenceInCandidate}</td>
                          <td className="num">{WORKED_EXAMPLE.exact.jaccard}</td>
                          <td className="mono">{WORKED_EXAMPLE.exact.referenceSpan}</td>
                          <td className="mono">{WORKED_EXAMPLE.exact.candidateSpan}</td>
                        </tr>
                        <tr>
                          <td className="mono">normalized</td>
                          <td className="mono">{WORKED_EXAMPLE.normalized.outcome}</td>
                          <td className="num">{WORKED_EXAMPLE.normalized.referenceInCandidate}</td>
                          <td className="num">{WORKED_EXAMPLE.normalized.jaccard}</td>
                          <td className="mono">{WORKED_EXAMPLE.normalized.referenceSpan}</td>
                          <td className="mono">{WORKED_EXAMPLE.normalized.candidateSpan}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="card-muted">
                    {section.calloutParagraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        style={
                          pIdx === section.calloutParagraphs.length - 1
                            ? { marginBottom: 0 }
                            : { marginBottom: "0.65rem" }
                        }
                      >
                        <RichText text={para} />
                      </p>
                    ))}
                  </div>

                  <h3 style={{ marginTop: "2rem" }}>{section.companionsHeading}</h3>
                  <div className="grid-2">
                    {section.companions.map((comp) => (
                      <div key={comp.title} className="card">
                        <div className="card-title-row">
                          <h4
                            style={{ marginBottom: 0 }}
                            className={comp.titleMono ? "mono" : undefined}
                          >
                            {comp.title}
                          </h4>
                          {comp.badge ? (
                            <span className={simpleBadgeClass(comp.badgeTone)}>
                              {comp.badge}
                            </span>
                          ) : null}
                        </div>
                        {comp.paragraphs?.map((para, pIdx) => (
                          <p key={pIdx} style={{ marginBottom: 0 }}>
                            <RichText text={para} />
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "layers":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.tableHeaders.map((hdr) => (
                            <th key={hdr} scope="col">
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row) => (
                          <tr key={row.layer}>
                            <td>
                              <RichText text={row.layer} />
                            </td>
                            <td>
                              <RichText text={row.records} />
                            </td>
                            <td>
                              <span className={simpleBadgeClass(row.statusTone)}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ActionLinks actions={section.actions} />
                </div>
              </section>
            );

          case "coverage-matrix":
            return (
              <section key={key} className="section-tight" aria-labelledby={section.id}>
                <div className="container">
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <div className="medium-plates">
                    {MEDIUM_PLATES.map((plate) => (
                      <figure key={plate.base} className="medium-plate">
                        <SpecimenPicture
                          base={plate.base}
                          alt={plate.alt}
                          sizes="(max-width: 860px) calc(50vw - 1.5rem), 242px"
                        />
                        <figcaption className="medium-plate-label">{plate.label}</figcaption>
                      </figure>
                    ))}
                  </div>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.tableHeaders.map((hdr) => (
                            <th key={hdr} scope="col">
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((item) => (
                          <tr key={item.kind}>
                            <td>
                              <strong>{item.kind}</strong>
                            </td>
                            <td className="mono" style={{ fontSize: "0.84rem" }}>
                              {item.profiles}
                            </td>
                            <td>
                              <span className={coverageBadgeClass(item.statusTone)}>
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <p style={{ marginBottom: "0.45rem" }}>
                                <RichText text={item.summary} />
                              </p>
                              <SourceLink path={item.sourcePath} anchor={item.anchor} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="card-muted">
                    <h3 style={{ marginBottom: "0.4rem" }}>{section.noteHeading}</h3>
                    <p style={{ marginBottom: 0 }}>
                      <RichText text={section.noteBody} />
                    </p>
                  </div>
                </div>
              </section>
            );

          case "planned-extensions":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="grid-2" style={{ marginTop: "1.25rem" }}>
                    {section.cards.map((cap) => (
                      <div key={cap.title} className="card">
                        <div className="card-title-row">
                          <h3 style={{ marginBottom: 0 }}>{cap.title}</h3>
                          <span className="badge mono">
                            {cap.status} · {cap.gates}
                          </span>
                        </div>
                        <p style={{ marginBottom: "0.65rem" }}>
                          <RichText text={cap.summary} />
                        </p>
                        <SourceLink path={cap.sourcePath} anchor={cap.anchor} />
                      </div>
                    ))}
                  </div>

                  <ActionLinks actions={section.actions} />
                </div>
              </section>
            );

          case "stat-section":
            return (
              <section
                key={key}
                className={section.tight ? "section-tight" : "section"}
                aria-labelledby={section.id}
              >
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div
                    className={
                      section.columns === 4 ? "stat-grid stat-grid-4" : "stat-grid"
                    }
                  >
                    {section.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="stat-card">
                        <div className="stat-value">
                          <RichText text={stat.value} />
                        </div>
                        <div className="stat-label">
                          <RichText text={stat.label} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="prose">
                    <RichText text={section.outro} />
                  </p>
                </div>
              </section>
            );

          case "prose-section":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container prose">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>
                      <RichText text={para} />
                    </p>
                  ))}
                  {section.actions ? <ActionLinks actions={section.actions} /> : null}
                </div>
              </section>
            );

          case "card-pair":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>

                  <div className="grid-2" style={{ marginTop: "1rem" }}>
                    {section.cards.map((card) => (
                      <div key={card.title} className="card">
                        <h3>{card.title}</h3>
                        {card.paragraphs?.map((para, pIdx) => (
                          <p key={pIdx}>
                            <RichText text={para} />
                          </p>
                        ))}
                        {card.footer ? (
                          <p style={{ marginBottom: 0 }}>
                            <RichText text={card.footer} />
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "image-fp-table":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>
                    <RichText text={section.heading} />
                  </h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.tableHeaders.map((hdr) => (
                            <th key={hdr} scope="col">
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {IMAGE_FP_ROWS.map((row) => (
                          <tr key={row.edit}>
                            <td>{row.edit}</td>
                            <td className="num">{row.pdq}</td>
                            <td className="num">{row.iscc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="prose">
                    <RichText text={section.outro} />
                  </p>
                </div>
              </section>
            );

          case "gate-rules":
            return (
              <section key={key} className="section-tight" aria-labelledby={section.id}>
                <div className="container">
                  <h2 id={section.id}>{section.heading}</h2>
                  <div className="grid-3">
                    {section.cards.map((card) => (
                      <div key={card.title} className="card">
                        <h3>{card.title}</h3>
                        <p style={{ marginBottom: 0 }}>
                          <RichText text={card.body} />
                        </p>
                      </div>
                    ))}
                  </div>

                  <h2 style={{ marginTop: "2.25rem" }}>{section.countsHeading}</h2>
                  <p className="prose">
                    <RichText text={section.countsIntro} />
                  </p>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">{section.countsHeaders[0]}</th>
                          <th scope="col" className="num">
                            {section.countsHeaders[1]}
                          </th>
                          <th scope="col" className="num">
                            {section.countsHeaders[2]}
                          </th>
                          <th scope="col" className="num">
                            {section.countsHeaders[3]}
                          </th>
                          <th scope="col" className="num">
                            {section.countsHeaders[4]}
                          </th>
                          <th scope="col">{section.countsHeaders[5]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong>{ROADMAP_COUNTS.core.label}</strong>
                          </td>
                          <td className="num">{ROADMAP_COUNTS.core.total}</td>
                          <td className="num">{ROADMAP_COUNTS.core.met}</td>
                          <td className="num">{ROADMAP_COUNTS.core.negativeResult}</td>
                          <td className="num">{ROADMAP_COUNTS.core.open}</td>
                          <td className="mono" style={{ fontSize: "0.82rem" }}>
                            {ROADMAP_COUNTS.core.metIds.join(", ")}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>{ROADMAP_COUNTS.later.label}</strong>
                          </td>
                          <td className="num">{ROADMAP_COUNTS.later.total}</td>
                          <td className="num">{ROADMAP_COUNTS.later.met}</td>
                          <td className="num">{ROADMAP_COUNTS.later.negativeResult}</td>
                          <td className="num">{ROADMAP_COUNTS.later.open}</td>
                          <td className="mono" style={{ fontSize: "0.82rem" }}>
                            {ROADMAP_COUNTS.later.metIds.join(", ")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );

          case "milestones-table":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>{section.heading}</h2>
                  <p className="prose">
                    <RichText text={section.intro} />
                  </p>

                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.tableHeaders.map((hdr) => (
                            <th key={hdr} scope="col">
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((m) => (
                          <tr key={m.id}>
                            <td>
                              <strong>
                                {m.id} — {m.name}
                              </strong>
                            </td>
                            <td className="mono">{m.gates}</td>
                            <td>
                              <RichText text={m.status} />
                            </td>
                            <td>
                              <RichText text={m.summary} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );

          case "tracks-table":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>{section.heading}</h2>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {section.tableHeaders.map((hdr) => (
                            <th key={hdr} scope="col">
                              {hdr}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row) => (
                          <tr key={row.track}>
                            <td className="mono">
                              <strong>{row.track}</strong>
                            </td>
                            <td>{row.scope}</td>
                            <td>
                              <RichText text={row.state} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ActionLinks actions={section.actions} />
                  <p style={{ marginTop: "1rem", marginBottom: 0 }}>
                    <Link href={section.footerLinkHref}>{section.footerLinkText}</Link>
                  </p>
                </div>
              </section>
            );

          case "governance-grid":
            return (
              <section key={key} className="section-tight" aria-labelledby={section.id}>
                <div className="container">
                  <div className="grid-2">
                    {section.cards.map((card, cIdx) => (
                      <div key={card.title} className="card">
                        <h2 id={cIdx === 0 ? section.id : undefined}>{card.title}</h2>
                        {card.paragraphs?.map((para, pIdx) => (
                          <p key={pIdx}>
                            <RichText text={para} />
                          </p>
                        ))}
                        {card.items ? (
                          <ul className="clean-list">
                            {card.items.map((item, i) => (
                              <li key={i}>
                                <RichText text={item} />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {card.footer ? (
                          <p style={{ marginTop: "1rem", marginBottom: 0 }}>
                            <RichText text={card.footer} />
                          </p>
                        ) : null}
                        {card.actions ? (
                          <ActionLinks
                            actions={card.actions}
                            style={{ marginTop: "1.1rem" }}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "licensing":
            return (
              <section key={key} className="section" aria-labelledby={section.id}>
                <div className="container prose">
                  <div className="eyebrow">{section.eyebrow}</div>
                  <h2 id={section.id}>{section.heading}</h2>
                  <p>
                    <RichText text={section.intro} />
                  </p>
                  <ul className="clean-list" style={{ marginBottom: "1.25rem" }}>
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                  {section.notes.map((note, nIdx) => (
                    <p key={nIdx}>
                      <RichText text={note} />
                    </p>
                  ))}
                  <ActionLinks actions={section.actions} />
                </div>
              </section>
            );
        }
      })}
    </>
  );
}
