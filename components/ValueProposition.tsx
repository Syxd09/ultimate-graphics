import React from "react";

export default function ValueProposition() {
  return (
    <section
      style={{
        backgroundColor: "#ff4500",
        color: "#ffffff",
        padding: "clamp(3.5rem, 8vw, 6.5rem) clamp(1rem, 3vw, 2.5rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            color: "rgba(255, 255, 255, 0.85)",
          }}
        >
          [ PHYSICAL CREDIBILITY ]
        </span>
        <blockquote
          style={{
            margin: 0,
            fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          People decide <span style={{ color: "#000000" }}>if they trust your brand</span> before they even walk through the door. That's not a metaphor. Physical credibility forms almost instantly, and it's shaped by{" "}
          <span style={{ color: "#ffffff", textDecoration: "underline" }}>
            precision fabrication, daylight contrast, structural finish, and illumination quality
          </span>
          .
        </blockquote>
      </div>
    </section>
  );
}

