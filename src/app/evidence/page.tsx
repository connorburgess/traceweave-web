import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  const page = getPageContent("evidence");
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
    },
  };
}

export default function EvidencePage() {
  const page = getPageContent("evidence");
  return <PageSections sections={page.sections} />;
}
