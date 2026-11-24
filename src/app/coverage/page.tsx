import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { getPageContent } from "@/lib/content";

const page = getPageContent("coverage");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.canonical,
  },
};

export default function CoveragePage() {
  return <PageSections sections={page.sections} />;
}
