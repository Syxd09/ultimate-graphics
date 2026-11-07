import type { Metadata } from "next";
import blogData from "../_raw/blog.json";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Signage & Fabrication Knowledge Base — Articles & Specs",
  description: "Technical fabrication articles, wind load calculations, 12kW laser comparisons, and fleet branding guides from our London studio.",
};

export default function BlogPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: blogData.styles }} />
      <div dangerouslySetInnerHTML={{ __html: blogData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={blogData.scripts} />
    </>
  );
}
