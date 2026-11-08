import type { Metadata } from "next";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Signage & Fabrication Knowledge Base — Articles & Specs",
  description: "Technical fabrication articles, wind load calculations, 12kW laser comparisons, and fleet branding guides from our London studio.",
};

export default function BlogPage() {
  const blogData = getRawPageData("blog.json");

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: blogData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: blogData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={blogData.scripts} />
    </>
  );
}
