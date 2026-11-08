import type { Metadata } from "next";
import contactData from "../_raw/contact.json";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

export const metadata: Metadata = {
  title: "Contact London Facility & 2-Hour Quote Request",
  description: "Contact Ultimate Graphics® in London. Direct phone, email, 2-hour quote turnaround, and facility visit details.",
};

export default function ContactPage() {
  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: contactData.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: contactData.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={contactData.scripts} />
    </>
  );
}
