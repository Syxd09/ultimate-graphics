import type { Metadata } from "next";
import aboutData from "../_raw/about.json";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "About Studio & Facility — London (Est. 2014)",
  description: "Learn about Ultimate Graphics®, established in 2014. In-house 24,000 sq ft London fabrication facility.",
};

export default function AboutPage() {
  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: aboutData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: aboutData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={aboutData.scripts} />
    </>
  );
}
