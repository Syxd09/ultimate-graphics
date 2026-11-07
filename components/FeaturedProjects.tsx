import React from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

export default function FeaturedProjects() {
  return (
    <section
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 2.5rem)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "clamp(2rem, 5vw, 3.5rem)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "1.5rem",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ff4500",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Selected Portfolio
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Recent Installations.
          </h2>
        </div>
        <Link
          href="/work"
          style={{
            color: "#ffffff",
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          View All Projects →
        </Link>
      </div>

      {/* Projects List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {projectsData.slice(0, 3).map((project, idx) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(1.5rem, 3vw, 3rem)",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
          >
            {/* Project Image */}
            <div
              style={{
                position: "relative",
                minHeight: "320px",
                maxHeight: "440px",
                overflow: "hidden",
                backgroundColor: "#161616",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Project Details */}
            <div
              style={{
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "0.85rem",
                      color: "#ff4500",
                    }}
                  >
                    (0{idx + 1})
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {project.category} • {project.year}
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 1.5rem 0",
                    fontSize: "0.95rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  {project.summary}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.75rem",
                        padding: "4px 10px",
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        borderRadius: "4px",
                        color: "rgba(255, 255, 255, 0.75)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "1rem",
                  display: "flex",
                  gap: "2rem",
                }}
              >
                {project.results.map((res) => (
                  <div key={res.label}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                      {res.value}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}>
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

