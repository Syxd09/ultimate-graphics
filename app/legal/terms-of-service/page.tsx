import type { Metadata } from "next";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Terms of Service | Ultimate Graphics®",
  description: "Terms of Service and commercial fabrication warranties for Ultimate Graphics®.",
};

export default function TermsOfServicePage() {
  const pageData = getRawPageData("legal_terms-of-service.json");

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={pageData.scripts} />
    </>
  );
}
