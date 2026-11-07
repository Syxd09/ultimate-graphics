import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Ultimate Graphics®",
  description: "Privacy policy and data governance for Ultimate Graphics® commercial signage clients.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 3vw, 2.5rem)" }}>
      <Link href="/" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.9rem", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
        ← Return Home
      </Link>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, marginBottom: "1rem" }}>Privacy Policy</h1>
      <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem", marginBottom: "3rem" }}>Last updated: January 2026</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.8rem" }}>1. Information We Collect</h2>
          <p>
            When you request an architectural quotation or submit technical drawings to {siteConfig.name}, we collect your contact information (name, corporate email, telephone, company name) and project specifications (CAD files, dimensions, site locations).
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.8rem" }}>2. How We Use Project Data</h2>
          <p>
            Data provided is strictly used to evaluate structural feasibility, engineer signage components, produce itemized estimates, and coordinate site installation logistics. We never sell or license client briefs or client contact lists.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.8rem" }}>3. Data Security &amp; NDA</h2>
          <p>
            All architectural drawings, proprietary brand assets, and confidential tender specifications are stored on encrypted internal servers with strict role-based access controls.
          </p>
        </section>
      </div>
    </div>
  );
}
