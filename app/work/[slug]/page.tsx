import type { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getRawPageData } from "@/lib/raw-data";
import { getProjects } from "@/lib/cms";
import FramerScriptsRunner from "@/components/FramerScriptsRunner";

const validLegacySlugs = [
  "box-mode",
  "johny-nashville",
  "nomad-stays",
  "stackline",
  "we-run-brand",
];

export async function generateStaticParams() {
  const projects = await getProjects();
  const cmsSlugs = projects.map((p) => ({ slug: p.slug }));
  const legacySlugs = validLegacySlugs.map((slug) => ({ slug }));
  return [...cmsSlugs, ...legacySlugs];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug || p.id === params.slug);

  if (project) {
    return {
      title: `${project.title} — Architectural Signage Case Study | Ultimate Graphics®`,
      description: project.summary || project.subtitle,
      openGraph: {
        title: `${project.title} | Ultimate Graphics® London`,
        description: project.summary || project.subtitle,
        images: project.image ? [{ url: project.image }] : undefined,
      },
    };
  }

  const title = params.slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${title} — Ultimate Graphics® Case Study`,
    description: `Architectural signage and commercial fabrication case study for ${title} by Ultimate Graphics® London.`,
  };
}

export default async function WorkSlugPage({ params }: { params: { slug: string } }) {
  // 1. If an extracted Framer raw page exists for this slug, render it
  const rawPath = path.join(process.cwd(), "app", "_raw", `work_${params.slug}.json`);
  if (fs.existsSync(rawPath)) {
    try {
      const data = getRawPageData(`work_${params.slug}.json`);
      return (
        <>
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.styles }} />
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: data.mainHtml }} />
          <FramerScriptsRunner scriptsHtml={data.scripts} />
        </>
      );
    } catch {
      // Fall through to CMS check if JSON parsing fails
    }
  }

  // 2. Dynamic CMS Project Case Study
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug || p.id === params.slug);

  if (!project) {
    notFound();
  }

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
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/work"
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
            ← Return to Architectural Works
          </Link>
        </div>

        {/* Case Study Header */}
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
              {project.category}
            </span>
            <span>•</span>
            <span>Client: {project.client}</span>
            <span>•</span>
            <span>Year: {project.year}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "0 0 1rem 0",
            }}
          >
            {project.title}
          </h1>

          {project.subtitle && (
            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.5,
                margin: "0 0 1.5rem 0",
              }}
            >
              {project.subtitle}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.72rem",
                    padding: "3px 8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "'Geist Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Hero Image */}
        {project.image && (
          <div
            style={{
              position: "relative",
              width: "100%",
              maxHeight: "560px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              marginBottom: "3rem",
              backgroundColor: "#0d0d11",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "560px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Executive Summary */}
        {project.summary && (
          <div
            style={{
              padding: "1.8rem 2rem",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderLeft: "3px solid #ff4500",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              borderRight: "1px solid rgba(255, 255, 255, 0.06)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              fontSize: "1.15rem",
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "3rem",
            }}
          >
            {project.summary}
          </div>
        )}

        {/* Engineering Challenge & Fabrication Solution */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {project.challenge && (
            <div
              style={{
                backgroundColor: "#0c0c0e",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#ff8142",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                1. Structural Challenge
              </h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.75)" }}>
                {project.challenge}
              </p>
            </div>
          )}

          {project.solution && (
            <div
              style={{
                backgroundColor: "#0c0c0e",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#34D399",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                2. Fabrication Solution
              </h3>
              <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.75)" }}>
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* Key Metrics & Deliverables */}
        {project.results && project.results.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${project.results.length}, 1fr)`,
              gap: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "3.5rem",
            }}
          >
            {project.results.map((r, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#0c0c0e",
                  padding: "20px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "4px",
                  }}
                >
                  {r.value}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "'Geist Mono', monospace",
                  }}
                >
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Studio Consultation CTA */}
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
            Central London Fabrication Facility
          </div>
          <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700 }}>
            Planning an Architectural Signage or Commercial Branding Installation?
          </h3>
          <p style={{ margin: 0, fontSize: "0.92rem", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.5 }}>
            Our project directors provide technical review, site survey planning, and guaranteed 2-hour quote turnaround.
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
            Request Project Quote →
          </Link>
        </div>
      </div>
    </article>
  );
}
