import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  const page = getPageContent("roadmap");
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
    },
  };
}

export default function RoadmapPage() {
  const page = getPageContent("roadmap");
  return <PageSections sections={page.sections} />;
}
