import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 2.5rem) clamp(3rem, 6vw, 5rem)",
        maxWidth: "1440px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
      }}
    >
      {/* Top Status & Est Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "6px 14px",
          borderRadius: "50px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          width: "fit-content",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#ff4500",
            boxShadow: "0 0 10px #ff4500",
          }}
        />
        <span
          style={{
            fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          (EST. {siteConfig.established} — ARCHITECTURAL SIGNAGE &amp; PRECISION FABRICATION)
        </span>
      </div>

      {/* Main Massive Editorial Heading */}
      <h1
        style={{
          margin: 0,
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          fontSize: "clamp(2.8rem, 7.5vw, 6.8rem)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          textTransform: "uppercase",
          maxWidth: "1200px",
        }}
      >
        Engineering <br />
        <span style={{ color: "#ff4500" }}>before</span> <br />
        fabrication.
      </h1>

      {/* Lead Subtitle */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "2rem",
        }}
      >
        <p
          style={{
            margin: 0,
            maxWidth: "650px",
            fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.75)",
            fontWeight: 400,
          }}
        >
          London architectural signage &amp; industrial fabrication facility. In-house 12kW fiber laser cutting, 5-axis CNC routing, automated channel letters, and 3M certified fleet livery.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
          <Link
            href="/work"
            style={{
              padding: "14px 28px",
              backgroundColor: "#ffffff",
              color: "#0b0b0b",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "background-color 0.2s ease, transform 0.15s ease",
            }}
          >
            View Projects (2026)
          </Link>
          <Link
            href="/contact"
            style={{
              padding: "14px 28px",
              backgroundColor: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            Request 2-Hour Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

