"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        width: "100%",
        backgroundColor: "rgba(11, 11, 11, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1rem, 3vw, 2.5rem)",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: "#ffffff",
          }}
        >
          <img
            src={siteConfig.logos.symbol}
            alt="Ultimate Graphics Symbol"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              objectFit: "cover",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              Ultimate Graphics®
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 500,
              }}
            >
              Est. {siteConfig.established} • London Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "28px",
          }}
          className="desktop-nav"
        >
          {siteConfig.navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                  transition: "color 0.2s ease",
                  position: "relative",
                  padding: "4px 0",
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#ff4500",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/contact"
            style={{
              display: "none",
              padding: "10px 20px",
              backgroundColor: "#ffffff",
              color: "#0b0b0b",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "0.85rem",
              letterSpacing: "-0.01em",
              textDecoration: "none",
              transition: "transform 0.15s ease, background-color 0.2s ease",
            }}
            className="desktop-nav-cta"
          >
            Get a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "36px",
              height: "36px",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "6px",
              cursor: "pointer",
              padding: "8px",
            }}
            className="mobile-nav-toggle"
          >
            <span
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "all 0.2s ease",
                transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#ffffff",
                opacity: mobileMenuOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <span
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "all 0.2s ease",
                transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "#0b0b0b",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "1.5rem clamp(1rem, 3vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: pathname === item.href ? "#ff4500" : "#ffffff",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: "12px 20px",
              backgroundColor: "#ff4500",
              color: "#ffffff",
              borderRadius: "4px",
              fontWeight: 600,
              fontSize: "0.95rem",
              textAlign: "center",
              textDecoration: "none",
              marginTop: "0.5rem",
            }}
          >
            Get a Quote (2-Hour SLA)
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          :global(.desktop-nav) {
            display: flex !important;
          }
          :global(.desktop-nav-cta) {
            display: inline-block !important;
          }
          :global(.mobile-nav-toggle) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

