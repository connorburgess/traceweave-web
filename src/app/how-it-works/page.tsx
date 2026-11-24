import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { getPageContent } from "@/lib/content";

export function generateMetadata(): Metadata {
  const page = getPageContent("how-it-works");
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
    },
  };
}

export default function HowItWorksPage() {
  const page = getPageContent("how-it-works");
  return <PageSections sections={page.sections} />;
}
