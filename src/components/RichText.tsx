import Link from "next/link";
import type { ReactNode } from "react";
import { SourceLink } from "@/components/SourceLink";
import { FACT_VALUES } from "@/data/facts";
import { DOCS_URL, SPEC_ISSUES_URL, SPEC_TREE_URL, specUrl } from "@/lib/sources";
import type { ActionItem } from "@/lib/content";

export function resolveHref(href: string): { url: string; external: boolean; mailto?: boolean } {
  if (href === "docs:") return { url: DOCS_URL, external: true };
  if (href === "spec-repo:") return { url: SPEC_TREE_URL, external: true };
  if (href === "spec-issues:") return { url: SPEC_ISSUES_URL, external: true };
  if (href.startsWith("spec:")) {
    const rest = href.slice("spec:".length);
    const [p, anchor] = rest.split("#");
    return { url: specUrl(p, anchor), external: true };
  }
  if (href.startsWith("mailto:")) {
    return { url: href, external: false, mailto: true };
  }
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return { url: href, external: true };
  }
  return { url: href, external: false };
}

function expandFactTokens(input: string): string {
  return input.replace(/\{\{fact:([^}]+)\}\}/g, (_match, rawKey: string) => {
    const key = rawKey.trim();
    if (!(key in FACT_VALUES)) {
      throw new Error(`Unknown fact key "${key}".`);
    }
    return FACT_VALUES[key];
  });
}

/**
 * Renders a small, explicit inline subset used in content markdown:
 *  - {{fact:key}} -> single-sourced value from src/data/facts.ts
 *  - {{code:key}} -> <code>fact value</code>
 *  - {{source:path[#anchor][|label]}} -> <SourceLink />
 *  - **bold** -> <strong>bold</strong>
 *  - `mono` -> <span className="mono">mono</span>
 *  - [label](href) -> <Link> or <a>
 */
export function renderInline(raw: string): ReactNode[] {
  const text = expandFactTokens(raw);
  const nodes: ReactNode[] = [];
  const tokenRe =
    /(\{\{code:([^}]+)\}\}|\{\{source:([^}]+)\}\}|\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;

  let lastIndex = 0;
  let keyIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      const factKey = match[2].trim();
      if (!(factKey in FACT_VALUES)) {
        throw new Error(`Unknown code fact key "${factKey}".`);
      }
      nodes.push(<code key={`c-${keyIdx++}`}>{FACT_VALUES[factKey]}</code>);
    } else if (match[3] !== undefined) {
      const [pathAndAnchor, label] = match[3].split("|");
      const [srcPath, anchor] = pathAndAnchor.split("#");
      nodes.push(
        <SourceLink
          key={`s-${keyIdx++}`}
          path={srcPath.trim()}
          anchor={anchor?.trim() || undefined}
          label={label?.trim() || undefined}
        />
      );
    } else if (match[4] !== undefined) {
      nodes.push(<strong key={`b-${keyIdx++}`}>{renderInline(match[4])}</strong>);
    } else if (match[5] !== undefined) {
      nodes.push(
        <span key={`m-${keyIdx++}`} className="mono">
          {match[5]}
        </span>
      );
    } else if (match[6] !== undefined && match[7] !== undefined) {
      const label = match[6];
      const { url, external, mailto } = resolveHref(match[7]);
      if (mailto) {
        nodes.push(
          <a key={`a-${keyIdx++}`} href={url}>
            {label}
          </a>
        );
      } else if (external) {
        nodes.push(
          <a key={`a-${keyIdx++}`} href={url} rel="noopener noreferrer">
            {label}
          </a>
        );
      } else {
        nodes.push(
          <Link key={`l-${keyIdx++}`} href={url}>
            {label}
          </Link>
        );
      }
    }

    lastIndex = tokenRe.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function RichText({ text }: { text: string }) {
  return <>{renderInline(text)}</>;
}

export function ActionLinks({
  actions,
  style,
}: {
  actions: readonly ActionItem[];
  style?: React.CSSProperties;
}) {
  return (
    <div className="actions" style={style}>
      {actions.map((action) => {
        const cls = action.variant === "primary" ? "btn btn-primary" : "btn btn-secondary";
        const { url, external } = resolveHref(action.href);
        if (external) {
          return (
            <a key={`${action.href}-${action.label}`} href={url} className={cls} rel="noopener noreferrer">
              {action.label}
            </a>
          );
        }
        return (
          <Link key={`${action.href}-${action.label}`} href={url} className={cls}>
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
