import type { Metadata } from "next";
import workData from "../_raw/work.json";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Commercial Signage & Fleet Portfolio — London Projects",
  description: "Explore our recent architectural signage, illuminated channel letters, CNC facades, and fleet wraps across the UK.",
};

export default function WorkPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: workData.styles }} />
      <div dangerouslySetInnerHTML={{ __html: workData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={workData.scripts} />
    </>
  );
}
