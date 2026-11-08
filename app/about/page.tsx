import type { Metadata } from "next";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "About Studio & Facility — London (Est. 2014)",
  description: "Learn about Ultimate Graphics®, established in 2014. In-house 24,000 sq ft London fabrication facility.",
};

export default function AboutPage() {
  const aboutData = getRawPageData("about.json");

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: aboutData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: aboutData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={aboutData.scripts} />
    </>
  );
}
