import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service & Fabrication Warranty | Ultimate Graphics®",
  description: "Commercial fabrication terms, payment schedules, wind load tolerances, and material warranties.",
};

export default function TermsOfServicePage() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 2.5rem)" }}>
      <Link href="/" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.9rem", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
        ← Return Home
      </Link>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, marginBottom: "1rem" }}>Terms of Service</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem", marginBottom: "3rem" }}>Last updated: January 2026</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.8rem" }}>1. Quotations &amp; Engineering Sign-Off</h2>
          <p>
            All custom signage, 12kW fiber laser profiles, and CNC architectural assemblies quoted by {siteConfig.name} remain valid for 30 calendar days. Production initiates following client approval of dimensioned shop drawings and sample finishes.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.8rem" }}>2. Warranties &amp; Materials</h2>
          <p>
            Structural aluminum frames carry a 10-year anti-perforation warranty. Commercial LED modules and solid-state drivers carry manufacturer warranties of 5 years. 3M vehicle fleet films are backed by the 3M MCS warranty program up to 7 years.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.8rem" }}>3. Installation &amp; Site Access</h2>
          <p>
            Clients are responsible for providing unobstructed site access, power terminations, and any necessary local authority planning permissions or highway licenses unless explicitly contracted within our turnkey package.
          </p>
        </section>
      </div>
    </div>
  );
}
