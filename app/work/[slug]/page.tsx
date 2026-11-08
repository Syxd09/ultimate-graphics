import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

const validSlugs = [
  "box-mode",
  "johny-nashville",
  "nomad-stays",
  "stackline",
  "we-run-brand"
];

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${title} — Ultimate Graphics® Case Study`,
    description: `Architectural signage and commercial fabrication case study for ${title} by Ultimate Graphics® London.`,
  };
}

export default function WorkSlugPage({ params }: { params: { slug: string } }) {
  if (!validSlugs.includes(params.slug)) {
    notFound();
  }

  const data = getRawPageData(`work_${params.slug}.json`);

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={data.scripts} />
    </>
  );
}
