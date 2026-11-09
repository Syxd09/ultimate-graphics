"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GOOGLE_REVIEW_URL = "https://g.page/r/CWCJQgHfoJUPEAE/review";

export default function SignageMetricsEnforcer() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const enforceSignageMetrics = () => {
      // 1. Target the orange highlight card label container
      const labelContainers = document.querySelectorAll(
        ".framer-1dinhmg, [data-framer-name*='Commercial signage installations completed across retail' i]"
      );
      labelContainers.forEach((el) => {
        const text = el.textContent || "";
        if (
          text.includes("meaningful action") ||
          text.includes("on our sites") ||
          !text.includes("bespoke signage quotes")
        ) {
          el.innerHTML = `
            <p class="framer-text framer-styles-preset-wwtw0z" data-styles-preset="sOZLdIwGR" dir="auto" style="--framer-text-color:rgba(255, 255, 255, 0.7);margin:0;font-family:'Inter',sans-serif;font-size:14px;line-height:1.4;">
              Average turnaround for<br class="framer-text">
              <span style="--framer-text-color:var(--token-8bc48ec1-e739-449f-9808-c21f0169d1a2, rgb(255, 255, 255));color:#ffffff;font-weight:600;" class="framer-text">bespoke signage quotes</span>
              &amp; engineering specs
            </p>
          `;
        }
      });

      // 2. Target the counter container in the orange card (2HR turnaround)
      const counterContainers = document.querySelectorAll(
        ".framer-1pfelev-container, [nodeid='Bi36lNWXS'], [id='Bi36lNWXS']"
      );
      counterContainers.forEach((el) => {
        const text = el.textContent || "";
        if (
          text.includes("3.2") ||
          text.includes("3.2S") ||
          text.includes("0.0S") ||
          (text.includes("S") && !text.includes("HR"))
        ) {
          el.innerHTML = `
            <div style="display:flex;gap:0px;align-items:center;font-size:58px;font-family:'Geist',sans-serif;font-weight:600;color:rgb(255, 255, 255);letter-spacing:-0.07em;line-height:1;">
              <span>2</span><span style="color:rgb(255, 255, 255)">HR</span>
            </div>
          `;
        }
      });

      // 3. Target the Client Review Rating Card (/4.6+)
      const reviewRatingContainers = document.querySelectorAll(
        ".framer-bi5vwq-container, [nodeid='AxLZC3JTd'], [id='AxLZC3JTd']"
      );
      reviewRatingContainers.forEach((el) => {
        const text = el.textContent || "";
        if (text.includes("4.9") || text.includes("0.0") || !text.includes("4.6")) {
          el.innerHTML = `
            <div style="display:flex;gap:0px;align-items:center;font-size:64px;font-family:'Geist',sans-serif;font-weight:500;color:rgb(255, 255, 255);letter-spacing:-0.07em;line-height:1;">
              <span style="color:rgb(255, 255, 255)">/</span><span>4.6</span><span style="color:rgb(255, 255, 255)">+</span>
            </div>
          `;
        }
      });

      // 4. Target the "Our Reviews" link button -> Google Review URL
      const reviewButtons = document.querySelectorAll(
        ".framer-17xc9wr-container a, [nodeid='xoFT3WtB0'] a, [id='xoFT3WtB0'] a, a[href*='trustpilot']"
      );
      reviewButtons.forEach((el) => {
        const a = el as HTMLAnchorElement;
        if (a.href !== GOOGLE_REVIEW_URL) {
          a.href = GOOGLE_REVIEW_URL;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
      });

      // Also target any anchor whose text includes "Our Reviews"
      const allAnchors = document.querySelectorAll("a");
      allAnchors.forEach((a) => {
        if ((a.textContent || "").includes("Our Reviews") || a.href.includes("trustpilot")) {
          a.href = GOOGLE_REVIEW_URL;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
      });

      // 5. Fallback scanner for any node mentioning "on our sites", "meaningful action", or "4.9+"
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.nodeValue) {
          if (node.nodeValue.includes("meaningful action") || node.nodeValue.includes("on our sites")) {
            const parent = node.parentElement;
            if (parent && !parent.closest("script") && !parent.closest("style")) {
              const card = parent.closest(".framer-1k3lmsr, .framer-1dinhmg");
              if (card) {
                const label = card.querySelector(".framer-1dinhmg") || card;
                label.innerHTML = `
                  <p class="framer-text framer-styles-preset-wwtw0z" data-styles-preset="sOZLdIwGR" dir="auto" style="--framer-text-color:rgba(255, 255, 255, 0.7);margin:0;font-family:'Inter',sans-serif;font-size:14px;line-height:1.4;">
                    Average turnaround for<br class="framer-text">
                    <span style="--framer-text-color:var(--token-8bc48ec1-e739-449f-9808-c21f0169d1a2, rgb(255, 255, 255));color:#ffffff;font-weight:600;" class="framer-text">bespoke signage quotes</span>
                    &amp; engineering specs
                  </p>
                `;
              }
            }
          } else if (node.nodeValue.includes("4.9+")) {
            const parent = node.parentElement;
            if (parent && !parent.closest("script") && !parent.closest("style")) {
              node.nodeValue = node.nodeValue.replace("4.9+", "4.6+");
            }
          }
        }
      }
    };

    // Run immediately
    enforceSignageMetrics();

    // Observe any delayed client-side hydration or Framer animation mounts
    const observer = new MutationObserver(() => {
      enforceSignageMetrics();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Run on key timer ticks
    const t1 = setTimeout(enforceSignageMetrics, 50);
    const t2 = setTimeout(enforceSignageMetrics, 200);
    const t3 = setTimeout(enforceSignageMetrics, 500);
    const t4 = setTimeout(enforceSignageMetrics, 1200);
    const t5 = setTimeout(enforceSignageMetrics, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [pathname]);

  return null;
}
