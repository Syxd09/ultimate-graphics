import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import ReloadingCurtain from "@/components/ReloadingCurtain";
import ContactFormInterceptor from "@/components/ContactFormInterceptor";
import SignageMetricsEnforcer from "@/components/SignageMetricsEnforcer";

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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
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

          /* 4. Project Description Field Matching Dark Architectural Theme */
          .ug-description-row {
            display: flex !important;
            flex-flow: column !important;
            align-items: flex-end !important;
            gap: 10px !important;
            width: 100% !important;
            position: relative !important;
            margin-top: 2px !important;
            margin-bottom: 2px !important;
          }

          .ug-desc-box-wrapper {
            width: 100% !important;
            display: flex !important;
            position: relative !important;
            box-sizing: border-box !important;
            border: 1px solid rgba(0, 0, 0, 0.16) !important;
            background-color: transparent !important;
            border-radius: 0px !important;
            transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          }

          .ug-desc-box-wrapper:focus-within {
            border-color: #ff4500 !important;
            box-shadow: 0 0 0 1px #ff4500 !important;
          }

          .ug-desc-textarea {
            width: 100% !important;
            min-height: 105px !important;
            background: transparent !important;
            border: none !important;
            outline: none !important;
            color: #0b0b0b !important;
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: 1.5 !important;
            letter-spacing: -0.01em !important;
            padding: 14px 16px !important;
            box-sizing: border-box !important;
            resize: vertical !important;
            display: block !important;
            border-radius: 0px !important;
          }

          .ug-desc-textarea::placeholder {
            color: rgba(11, 11, 11, 0.45) !important;
            font-weight: 400 !important;
          }

          /* Description field in dark footer context */
          footer .ug-desc-box-wrapper,
          .framer-24skgi .ug-desc-box-wrapper,
          footer.framer-rNgTX .ug-desc-box-wrapper,
          .ug-desc-box-wrapper.ug-theme-dark {
            border-color: rgba(255, 255, 255, 0.12) !important;
          }

          footer .ug-desc-textarea,
          .framer-24skgi .ug-desc-textarea,
          footer.framer-rNgTX .ug-desc-textarea,
          .ug-desc-textarea.ug-theme-dark {
            color: #ffffff !important;
          }

          footer .ug-desc-textarea::placeholder,
          .framer-24skgi .ug-desc-textarea::placeholder,
          footer.framer-rNgTX .ug-desc-textarea::placeholder,
          .ug-desc-textarea.ug-theme-dark::placeholder {
            color: rgba(255, 255, 255, 0.35) !important;
          }

          footer .ug-description-row p,
          .framer-24skgi .ug-description-row p,
          footer.framer-rNgTX .ug-description-row p,
          .ug-description-row.ug-theme-dark p {
            color: rgba(255, 255, 255, 0.6) !important;
          }

          .framer-1quigvc .ug-description-row p,
          .framer-OeKVD .ug-description-row p,
          .ug-description-row.ug-theme-light p {
            color: rgba(11, 11, 11, 0.6) !important;
          }

          .framer-1quigvc .ug-desc-textarea,
          .framer-OeKVD .ug-desc-textarea,
          .ug-desc-textarea.ug-theme-light {
            color: #0b0b0b !important;
          }

          .framer-1quigvc .ug-desc-box-wrapper,
          .framer-OeKVD .ug-desc-box-wrapper,
          .ug-desc-box-wrapper.ug-theme-light {
            border-color: rgba(0, 0, 0, 0.18) !important;
          }

          /* 5. Custom Architectural Dropdown System */
          .ug-custom-dropdown,
          .ug-custom-dropdown-root {
            width: 100% !important;
            position: relative !important;
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            user-select: none !important;
            overflow: visible !important;
          }

          .ug-dropdown-trigger {
            width: 100% !important;
            min-height: 52px !important;
            box-sizing: border-box !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 14px 18px !important;
            background-color: transparent !important;
            border: 1px solid rgba(0, 0, 0, 0.18) !important;
            border-radius: 0px !important;
            color: #0b0b0b !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            letter-spacing: -0.01em !important;
            cursor: pointer !important;
            transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease !important;
            outline: none !important;
          }

          .ug-dropdown-trigger:hover {
            border-color: rgba(0, 0, 0, 0.38) !important;
            background-color: rgba(0, 0, 0, 0.03) !important;
          }

          .ug-dropdown-arrow {
            flex-shrink: 0 !important;
            margin-left: 12px !important;
            transition: transform 0.2s ease !important;
            color: inherit !important;
          }

          .ug-dropdown-arrow path {
            stroke: currentColor !important;
          }

          /* Dropdown trigger in dark footer context */
          footer .ug-dropdown-trigger,
          .framer-24skgi .ug-dropdown-trigger,
          footer.framer-rNgTX .ug-dropdown-trigger,
          .ug-dropdown-trigger.ug-theme-dark,
          .ug-theme-dark .ug-dropdown-trigger {
            border-color: rgba(255, 255, 255, 0.14) !important;
            color: #ffffff !important;
          }

          footer .ug-dropdown-trigger:hover,
          .framer-24skgi .ug-dropdown-trigger:hover,
          footer.framer-rNgTX .ug-dropdown-trigger:hover,
          .ug-dropdown-trigger.ug-theme-dark:hover,
          .ug-theme-dark .ug-dropdown-trigger:hover {
            border-color: rgba(255, 255, 255, 0.3) !important;
            background-color: rgba(255, 255, 255, 0.03) !important;
          }

          footer .ug-dropdown-trigger .ug-dropdown-selected-text,
          .framer-24skgi .ug-dropdown-trigger .ug-dropdown-selected-text,
          .ug-dropdown-trigger.ug-theme-dark .ug-dropdown-selected-text,
          .ug-theme-dark .ug-dropdown-selected-text {
            color: #ffffff !important;
          }

          /* Dropdown trigger in light contact form context */
          .framer-1quigvc .ug-dropdown-trigger,
          .framer-OeKVD .ug-dropdown-trigger,
          .ug-dropdown-trigger.ug-theme-light,
          .ug-theme-light .ug-dropdown-trigger {
            border-color: rgba(0, 0, 0, 0.2) !important;
            color: #0b0b0b !important;
          }

          .framer-1quigvc .ug-dropdown-trigger:hover,
          .framer-OeKVD .ug-dropdown-trigger:hover,
          .ug-dropdown-trigger.ug-theme-light:hover,
          .ug-theme-light .ug-dropdown-trigger:hover {
            border-color: rgba(0, 0, 0, 0.45) !important;
            background-color: rgba(0, 0, 0, 0.04) !important;
          }

          .framer-1quigvc .ug-dropdown-trigger .ug-dropdown-selected-text,
          .framer-OeKVD .ug-dropdown-trigger .ug-dropdown-selected-text,
          .ug-dropdown-trigger.ug-theme-light .ug-dropdown-selected-text,
          .ug-theme-light .ug-dropdown-selected-text {
            color: #0b0b0b !important;
          }

          .framer-1quigvc .ug-dropdown-trigger .ug-dropdown-arrow,
          .framer-OeKVD .ug-dropdown-trigger .ug-dropdown-arrow,
          .ug-dropdown-trigger.ug-theme-light .ug-dropdown-arrow,
          .ug-theme-light .ug-dropdown-arrow {
            color: #0b0b0b !important;
          }

          .framer-1quigvc .ug-dropdown-trigger .ug-dropdown-arrow path,
          .framer-OeKVD .ug-dropdown-trigger .ug-dropdown-arrow path,
          .ug-dropdown-trigger.ug-theme-light .ug-dropdown-arrow path,
          .ug-theme-light .ug-dropdown-arrow path {
            stroke: #0b0b0b !important;
          }

          /* When open, trigger always transitions to dark architectural header matching menu */
          .ug-dropdown-trigger.is-open {
            border-color: #ff4500 !important;
            box-shadow: 0 0 0 1px #ff4500 !important;
            background-color: #0c0c0e !important;
            color: #ffffff !important;
          }

          .ug-dropdown-trigger.is-open .ug-dropdown-selected-text {
            color: #ffffff !important;
          }

          .ug-dropdown-trigger.is-open .ug-dropdown-arrow {
            transform: rotate(180deg) !important;
            color: #ffffff !important;
          }

          .ug-dropdown-trigger.is-open .ug-dropdown-arrow path {
            stroke: #ff4500 !important;
          }

          .ug-dropdown-menu {
            position: absolute !important;
            top: calc(100% + 2px) !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 999999 !important;
            background-color: #0c0c0e !important;
            border: 1px solid rgba(255, 255, 255, 0.16) !important;
            box-shadow: 0 24px 50px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
            border-radius: 0px !important;
            padding: 4px 0 !important;
            display: none !important;
            flex-direction: column !important;
            backdrop-filter: blur(20px) !important;
            animation: ugDropdownFadeIn 0.15s ease !important;
            max-height: 440px !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }

          .ug-dropdown-menu.is-open,
          .ug-custom-dropdown.is-open .ug-dropdown-menu,
          .ug-custom-dropdown-root.is-open .ug-dropdown-menu,
          .ug-dropdown-trigger.is-open + .ug-dropdown-menu {
            display: flex !important;
          }

          .ug-dropdown-menu::-webkit-scrollbar {
            width: 4px;
          }
          .ug-dropdown-menu::-webkit-scrollbar-track {
            background: transparent;
          }
          .ug-dropdown-menu::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 0px;
          }

          @keyframes ugDropdownFadeIn {
            from {
              opacity: 0;
              transform: translateY(-4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .ug-dropdown-item {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 13px 18px !important;
            color: rgba(255, 255, 255, 0.82) !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            letter-spacing: -0.01em !important;
            cursor: pointer !important;
            transition: background-color 0.12s ease, color 0.12s ease !important;
            border-left: 2px solid transparent !important;
            background-color: transparent !important;
            box-sizing: border-box !important;
          }

          .ug-dropdown-item:hover {
            background-color: rgba(255, 255, 255, 0.06) !important;
            color: #ffffff !important;
          }

          .ug-dropdown-item.is-selected {
            background-color: rgba(255, 69, 0, 0.1) !important;
            color: #ffffff !important;
            border-left: 2px solid #ff4500 !important;
            font-weight: 600 !important;
          }

          /* Native select fallback dark mode & wrapper override */
          :root, html, body {
            color-scheme: dark !important;
          }

          /* Ensure form and all ancestors allow dropdown menus to overlay cleanly without clipping */
          form[data-framer-form],
          .framer-1quigvc,
          .framer-24skgi,
          .framer-1lgokrd,
          .framer-90sxxy,
          .framer-form-select-wrapper,
          .framer-form-input-wrapper {
            overflow: visible !important;
          }

          .framer-form-select-wrapper {
            overflow: visible !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }

          .framer-form-select-wrapper::before,
          .framer-form-select-wrapper::after {
            display: none !important;
            content: none !important;
            opacity: 0 !important;
          }

          select, option, optgroup {
            color-scheme: dark !important;
            background-color: #0c0c0e !important;
            color: #ffffff !important;
            border-radius: 0px !important;
          }

          select option {
            background-color: #0c0c0e !important;
            color: #ffffff !important;
            padding: 10px 14px !important;
          }
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          // Recover Chromium video playback if local disk cache holds a corrupted byte-range entry
          document.addEventListener('error', function(e) {
            var el = e.target;
            if (!el) return;
            if (el.tagName === 'VIDEO') {
              var s = el.currentSrc || el.src;
              if (s && !s.includes('cache_bust=')) {
                el.src = s + (s.includes('?') ? '&' : '?') + 'cache_bust=' + Date.now();
                el.load();
                el.play && el.play().catch(function(){});
              }
            } else if (el.tagName === 'SOURCE' && el.parentElement && el.parentElement.tagName === 'VIDEO') {
              var v = el.parentElement;
              var s = el.src;
              if (s && !s.includes('cache_bust=')) {
                el.src = s + (s.includes('?') ? '&' : '?') + 'cache_bust=' + Date.now();
                v.load();
                v.play && v.play().catch(function(){});
              }
            }
          }, true);
        `}} />
      </head>
      <body suppressHydrationWarning>
        <ReloadingCurtain />
        <ContactFormInterceptor />
        <SignageMetricsEnforcer />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
