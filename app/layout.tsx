import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import ReloadingCurtain from "@/components/ReloadingCurtain";

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ultimategraphics.com"),
  title: {
    default: "Ultimate Graphics® — Architectural Signage, 12kW Fiber Laser & Fleet Studio (Est. 2014)",
    template: "%s | Ultimate Graphics® London",
  },
  description:
    "Ultimate Graphics® is a London architectural signage and commercial fabrication studio established in 2014. In-house 12kW fiber laser cutting, 5-axis CNC routing, automated channel letters, and 3M commercial fleet branding with 2-hour quote SLA.",
  keywords: [
    "commercial signage London",
    "architectural signage UK",
    "vehicle branding",
    "cabinet signs",
    "channel letter fabrication",
    "12kW fiber laser cutting",
    "5 axis CNC routing",
    "neon signs bespoke",
    "digital signage totems",
    "glass frosting manifestation",
    "sun board printing",
    "station signage wayfinding"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ultimate Graphics® — Architectural Signage & Precision Laser Studio (Est. 2014)",
    description: "In-house 12kW fiber laser cutting, 5-axis CNC, channel letters, and 3M certified commercial fleet wraps in London. 2-Hour Quote SLA.",
    url: "https://ultimategraphics.com",
    siteName: "Ultimate Graphics®",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/AZdKLugP6NzACkX2hBYq9K4wFQ.jpg",
        width: 1200,
        height: 630,
        alt: "Ultimate Graphics Architectural Signage Fabrication London",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Graphics® — Architectural Signage & Fabrication Lab",
    description: "In-house 12kW fiber laser, 5-axis CNC, illuminated channel letters, and vehicle fleet branding. Est. 2014.",
    images: ["/images/AZdKLugP6NzACkX2hBYq9K4wFQ.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles/lenis.css" />
        <link rel="icon" href="/logos/symbol-logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logos/symbol-logo.jpeg" />
        <link rel="shortcut icon" href="/logos/symbol-logo.jpeg" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide Framer badges and external template links */
          #__framer-badge-container,
          .framer-yzm739,
          .framer-1h98gar,
          .framer-badge,
          [data-framer-name="CreatedBy Container"],
          a[href*="framer.com"],
          a[href*="framer.link"] {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }

          /* 1. Header / Navbar Logo: Official Symbol Mark */
          .framer-mPih4 .framer-1si81u6 {
            background-image: url('/logos/symbol-logo.jpeg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            border-radius: 6px !important;
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            min-height: 32px !important;
            margin-right: 10px !important;
            display: inline-block !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45) !important;
          }
          .framer-mPih4 .framer-1si81u6 svg,
          .framer-mPih4 .framer-1si81u6 .svgContainer {
            display: none !important;
            opacity: 0 !important;
          }

          /* 2. Universal Footer Banner: Official Wide Architectural Footer Logo */
          footer.framer-rNgTX .framer-tl8ugv {
            border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding-top: 45px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          footer.framer-rNgTX .framer-tl8ugv::before {
            content: "";
            display: block;
            width: 100%;
            max-width: 1100px;
            height: clamp(65px, 12vw, 130px);
            margin: 0 auto 35px auto;
            background-image: url('/logos/footer-logo.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            opacity: 0.95;
          }

          /* 3. Floating Bottom-Right Corner Badge */
          .framer-1o9ovh0 img,
          [data-framer-name="Phone"] .framer-1o9ovh0 img,
          .framer-bp41xy img {
            content: url('/logos/symbol-logo.jpeg') !important;
            object-fit: cover !important;
          }
        `}} />
      </head>
      <body>
        <ReloadingCurtain />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
