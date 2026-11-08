import type { Metadata } from "next";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Privacy Policy | Ultimate Graphics®",
  description: "Privacy policy for Ultimate Graphics®, architectural signage and fabrication studio London.",
};

export default function PrivacyPolicyPage() {
  const pageData = getRawPageData("legal_privacy-policy.json");

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={pageData.scripts} />
    </>
  );
}
