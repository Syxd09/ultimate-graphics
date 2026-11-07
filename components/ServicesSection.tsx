import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";

export default function ServicesSection() {
  return (
    <section
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1rem, 3vw, 2.5rem)",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1.5rem",
          marginBottom: "clamp(2rem, 5vw, 4rem)",
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
            Capabilities &amp; Machinery
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
            In-House Production.
          </h2>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: "450px",
            fontSize: "0.95rem",
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.5,
          }}
        >
          No subcontracting. From 12kW fiber laser cutting to automated channel letter flanging, every millimeter is fabricated in our London facility.
        </p>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {servicesData.map((service) => (
          <div
            key={service.id}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem",
              transition: "transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "0.85rem",
                    color: "#ff4500",
                    fontWeight: 600,
                  }}
                >
                  ({service.iconNumber})
                </span>
                {service.featured && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      backgroundColor: "rgba(255, 69, 0, 0.15)",
                      color: "#ff4500",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Core Spec
                  </span>
                )}
              </div>

              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.65)",
                  lineHeight: 1.5,
                }}
              >
                {service.shortDesc}
              </p>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                paddingTop: "1rem",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.45)",
                fontFamily: "'Geist Mono', monospace",
              }}
            >
              {service.specs}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

