import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getRawPageData } from "@/lib/raw-data";
import { getBlogPosts } from "@/lib/cms";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

const validLegacySlugs = [
  "how-to-pick-the-right-platform-framer-vs-webflow-vs-custom",
  "how-to-write-a-landing-page-that-actually-converts",
  "how-we-cut-bounce-rate-by-34-with-one-layout-change",
  "how-we-structure-a-project-from-brief-to-launch",
  "one-cta-or-two-we-tested-it-23-times",
  "small-defaults-big-outcomes-lessons-from-behavioral-design",
  "stop-hiding-your-prices",
  "why-most-redesigns-fail-—-and-what-to-do-instead",
];

const slugAliases: Record<string, string> = {
  "why-cheap-signage-fails-—-and-what-to-do-instead": "architectural-signage-specifications-guide",
  "fleet-vehicle-branding-commercial-vans-and-trucks": "commercial-fleet-branding-maintenance",
  "materials-guide-brass-stainless-steel-aluminum-signage": "fiber-laser-vs-waterjet-metal-signage",
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const cmsSlugs = posts.map((p) => ({ slug: p.slug }));
  const legacySlugs = validLegacySlugs.map((slug) => ({ slug }));
  const aliasSlugs = Object.keys(slugAliases).map((slug) => ({ slug }));
  return [...cmsSlugs, ...legacySlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (post) {
    return {
      title: `${post.title} | Ultimate Graphics® Insights`,
      description: post.excerpt || post.subtitle,
      openGraph: {
        title: `${post.title} | Ultimate Graphics® London`,
        description: post.excerpt || post.subtitle,
        images: post.image ? [{ url: post.image }] : undefined,
      },
    };
  }

  const title = params.slug.replace(/-/g, " ");
  return {
    title: `${title} — Ultimate Graphics® Studio Insights`,
    description: `Technical signage design and fabrication insight from Ultimate Graphics® London.`,
  };
}

export default async function BlogSlugPage({ params }: { params: { slug: string } }) {
  const rawSlug = decodeURIComponent(params.slug || "");
  if (rawSlug.includes("Cast Acrylic")) {
    redirect("/blog/how-to-pick-the-right-platform-framer-vs-webflow-vs-custom");
  }

  if (rawSlug.includes("why-cheap-signage")) {
    redirect("/blog/architectural-signage-specifications-guide");
  }

  if (rawSlug.includes("fleet-vehicle-branding")) {
    redirect("/blog/commercial-fleet-branding-maintenance");
  }

  if (rawSlug.includes("materials-guide")) {
    redirect("/blog/fiber-laser-vs-waterjet-metal-signage");
  }

  if (slugAliases[params.slug] || slugAliases[rawSlug]) {
    redirect(`/blog/${slugAliases[params.slug] || slugAliases[rawSlug]}`);
  }

  // 1. Check dynamic CMS blog posts
  const posts = await getBlogPosts();
  const cmsPost = posts.find((p) => p.slug === params.slug);

  if (cmsPost) {
    return (
      <article
        style={{
          backgroundColor: "#070707",
          color: "#ffffff",
          minHeight: "100vh",
          padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2.5rem)",
          fontFamily: "'Geist', -apple-system, system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Breadcrumb / Back Link */}
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#ff4500",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontFamily: "'Geist Mono', monospace",
                textDecoration: "none",
              }}
            >
              ← Return to Knowledge Base
            </Link>
          </div>

          {/* Article Header */}
          <header style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "'Geist Mono', monospace",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 8px",
                  backgroundColor: "rgba(255, 69, 0, 0.12)",
                  border: "1px solid rgba(255, 69, 0, 0.3)",
                  color: "#ff8142",
                  fontWeight: 700,
                }}
              >
                {cmsPost.category}
              </span>
              <span>•</span>
              <span>{cmsPost.date}</span>
              <span>•</span>
              <span>{cmsPost.readTime}</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                margin: "0 0 1rem 0",
              }}
            >
              {cmsPost.title}
            </h1>

            {cmsPost.subtitle && (
              <p
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {cmsPost.subtitle}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {cmsPost.image && (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxHeight: "520px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                marginBottom: "2.5rem",
                backgroundColor: "#0d0d11",
              }}
            >
              <img
                src={cmsPost.image}
                alt={cmsPost.title}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "520px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Lead Excerpt */}
          {cmsPost.excerpt && (
            <div
              style={{
                padding: "1.5rem 1.8rem",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderLeft: "3px solid #ff4500",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                borderRight: "1px solid rgba(255, 255, 255, 0.06)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.9)",
                marginBottom: "2.5rem",
                fontStyle: "italic",
              }}
            >
              {cmsPost.excerpt}
            </div>
          )}

          {/* Article Body */}
          <div
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginBottom: "4rem",
            }}
          >
            {cmsPost.content.map((paragraph, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Direct Engineering Quote Callout */}
          <div
            style={{
              padding: "2.5rem",
              backgroundColor: "#0d0d11",
              border: "1px solid rgba(255, 69, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                color: "#ff4500",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 700,
              }}
            >
              Architectural Signage &amp; Fabrication SLA
            </div>
            <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700 }}>
              Require Technical Drawings or Fabrication Feasibility for Your Project?
            </h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.5 }}>
              Our London facility reviews CAD drawings, material gauges, and LED load specifications within 2 business hours.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#ff4500",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textDecoration: "none",
                marginTop: "0.5rem",
              }}
            >
              Request 2-Hour Quote →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 2. Legacy Framer raw snapshot fallback
  if (validLegacySlugs.includes(params.slug)) {
    try {
      const data = getRawPageData(`blog_${params.slug}.json`);
      return (
        <>
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.styles }} />
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.mainHtml }} />
          <FramerScriptsRunner scriptsHtml={data.scripts} />
        </>
      );
    } catch {
      notFound();
    }
  }

  notFound();
}
