import type { Metadata } from "next";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Commercial Signage & Fleet Portfolio — London Projects",
  description: "Explore our recent architectural signage, illuminated channel letters, CNC facades, and fleet wraps across the UK.",
};

export default function WorkPage() {
  const workData = getRawPageData("work.json");

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: workData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: workData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={workData.scripts} />
    </>
  );
}
