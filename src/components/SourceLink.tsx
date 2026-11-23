import { specUrl } from "@/lib/sources";

interface SourceLinkProps {
  path: string;
  anchor?: string;
  label?: string;
}

export function SourceLink({ path, anchor, label }: SourceLinkProps) {
  return (
    <a
      href={specUrl(path, anchor)}
      className="source-link"
      rel="noopener noreferrer"
    >
      {label ?? path}
    </a>
  );
}
