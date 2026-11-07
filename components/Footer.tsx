"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Vehicle Branding & Vehicle Stickering",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 600);
  };

  return (
    <footer
      style={{
        backgroundColor: "#070707",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Section: Director Review & Contact Form */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 2.5rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(2rem, 5vw, 4rem)",
        }}
      >
        {/* Left Column: Studio & Director Overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Director Card */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={siteConfig.director.avatar}
                alt={siteConfig.director.name}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ff4500",
                }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                  {siteConfig.director.name}
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)" }}>
                  {siteConfig.director.title}
                </p>
              </div>
            </div>

            <blockquote
              style={{
                margin: 0,
                fontSize: "1.05rem",
                fontStyle: "italic",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.6,
                borderLeft: "3px solid #ff4500",
                paddingLeft: "1rem",
              }}
            >
              "{siteConfig.director.quote}"
            </blockquote>

            <div
              style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
              {siteConfig.contact.sla}
            </div>
          </div>

          {/* Direct Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255, 255, 255, 0.4)" }}>
                Direct Enquiries
              </span>
              <p style={{ margin: "4px 0 0 0", fontSize: "1.2rem", fontWeight: 600 }}>
                <a href={`tel:${siteConfig.contact.phone}`} style={{ color: "#ffffff", textDecoration: "none" }}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p style={{ margin: "4px 0 0 0", fontSize: "1rem" }}>
                <a href={`mailto:${siteConfig.contact.email}`} style={{ color: "#ff4500", textDecoration: "none" }}>
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255, 255, 255, 0.4)" }}>
                London Facility Address
              </span>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }}>
                {siteConfig.contact.address}<br />
                {siteConfig.contact.city}, {siteConfig.contact.postcode}, {siteConfig.contact.country}
              </p>
              <p style={{ margin: "6px 0 0 0", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)" }}>
                {siteConfig.contact.hours.weekdays} • {siteConfig.contact.hours.saturday}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Request Form */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <h3 style={{ margin: "0 0 8px 0", fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
            Start a project.
          </h3>
          <p style={{ margin: "0 0 2rem 0", fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.5 }}>
            Whether you have an architect specification or just an initial concept, we're here to engineer it. 2-hour quote turnaround.
          </p>

          {formStatus === "success" ? (
            <div
              style={{
                padding: "2rem",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid #10B981",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0", color: "#10B981", fontSize: "1.2rem" }}>Quote Request Received!</h4>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.8)" }}>
                Our production team is reviewing your details and will respond within 2 business hours.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                style={{
                  marginTop: "1.5rem",
                  padding: "8px 16px",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "6px" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "6px" }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "6px" }}>
                  Fabrication & Signage Capability
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "#161616",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="Vehicle Branding & Vehicle Stickering">Vehicle Branding &amp; Commercial Fleet</option>
                  <option value="12kW Fiber Laser Cutting">12kW Fiber Laser Metal Fabrication</option>
                  <option value="5-Axis CNC Routing">5-Axis CNC Architectural Routing</option>
                  <option value="Illuminated 3D Channel Letters">Illuminated 3D Channel Letters</option>
                  <option value="Cabinet Signs & Station Signs">Architectural Cabinet Signs &amp; Totems</option>
                  <option value="Neon Signs & Digital Signage">Bespoke Neon &amp; 4K Digital Totems</option>
                  <option value="Glass Manifestation & Frosting">Glass Manifestation &amp; Privacy Frosting</option>
                  <option value="Large Format UV Flatbed Print">Direct UV Flatbed Printing</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "6px" }}>
                  Project Details / Dimensions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline dimensions, materials, or installation location..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                style={{
                  padding: "14px 24px",
                  backgroundColor: "#ffffff",
                  color: "#0b0b0b",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, transform 0.1s ease",
                  marginTop: "0.5rem",
                }}
              >
                {formStatus === "submitting" ? "Sending Request..." : "Submit Quote Request"}
              </button>

              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", textAlign: "center" }}>
                By submitting, you agree to our{" "}
                <Link href="/legal/terms-of-service" style={{ color: "rgba(255, 255, 255, 0.7)", textDecoration: "underline" }}>
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy-policy" style={{ color: "rgba(255, 255, 255, 0.7)", textDecoration: "underline" }}>
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Official Wide Architectural Footer Banner Logo */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "clamp(2rem, 5vw, 4rem) 1rem clamp(1rem, 3vw, 2rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={siteConfig.logos.footer}
          alt="Ultimate Graphics Architecture Logo"
          style={{
            width: "100%",
            maxWidth: "1100px",
            height: "auto",
            maxHeight: "130px",
            objectFit: "contain",
            opacity: 0.95,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Bottom Bar: Links & Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "1.5rem clamp(1rem, 3vw, 2.5rem)",
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div>
          © {siteConfig.established}–2026 {siteConfig.name}. All rights reserved.
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/legal/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/legal/terms-of-service" style={{ color: "inherit", textDecoration: "none" }}>
            Terms of Service
          </Link>
          <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            Instagram
          </a>
          <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            X (Twitter)
          </a>
        </div>
      </div>
    </footer>
  );
}

