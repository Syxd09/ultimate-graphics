import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "clamp(6rem, 12vw, 10rem) 1.5rem",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: "1rem",
          color: "#ff4500",
          fontWeight: 700,
          letterSpacing: "0.1em",
        }}
      >
        [ 404 ERROR ]
      </span>
      <h1
        style={{
          margin: "1rem 0 1.5rem 0",
          fontFamily: "'Geist', system-ui, sans-serif",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.04em",
        }}
      >
        Drawing Not Found.
      </h1>
      <p
        style={{
          margin: "0 auto 2.5rem auto",
          maxWidth: "500px",
          color: "rgba(255, 255, 255, 0.65)",
          fontSize: "1.1rem",
          lineHeight: 1.6,
        }}
      >
        The architectural route or specification page you are looking for has been relocated or archived.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#ffffff",
          color: "#0b0b0b",
          borderRadius: "6px",
          fontWeight: 700,
          fontSize: "0.95rem",
          textDecoration: "none",
        }}
      >
        Return to Facility Home →
      </Link>
    </div>
  );
}

