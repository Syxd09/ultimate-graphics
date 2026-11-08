import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRawPageData } from "@/lib/raw-data";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

const validBlogSlugs = [
  "how-to-pick-the-right-platform-framer-vs-webflow-vs-custom",
  "how-to-write-a-landing-page-that-actually-converts",
  "how-we-cut-bounce-rate-by-34-with-one-layout-change",
  "how-we-structure-a-project-from-brief-to-launch",
  "one-cta-or-two-we-tested-it-23-times",
  "small-defaults-big-outcomes-lessons-from-behavioral-design",
  "stop-hiding-your-prices",
  "why-most-redesigns-fail-—-and-what-to-do-instead"
];

export async function generateStaticParams() {
  return validBlogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = params.slug.replace(/-/g, " ");
  return {
    title: `${title} — Ultimate Graphics® Studio Insights`,
    description: `Technical signage design and fabrication insight from Ultimate Graphics® London.`,
  };
}

export default function BlogSlugPage({ params }: { params: { slug: string } }) {
  if (!validBlogSlugs.includes(params.slug)) {
    notFound();
  }

  const data = getRawPageData(`blog_${params.slug}.json`);

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.styles }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.mainHtml }} />
      <FramerScriptsRunner scriptsHtml={data.scripts} />
    </>
  );
}
