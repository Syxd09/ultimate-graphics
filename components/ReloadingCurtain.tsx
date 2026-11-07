"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export const CURTAIN_PALETTES = [
  {
    id: "red",
    name: "Red",
    color: "#E11D48", // Single solid red
    text: "#FFFFFF",
    sub: "rgba(255, 255, 255, 0.82)",
  },
  {
    id: "yellow",
    name: "Yellow",
    color: "#FFB800", // Single solid yellow
    text: "#000000", // High contrast black on yellow
    sub: "rgba(0, 0, 0, 0.75)",
  },
  {
    id: "pink",
    name: "Pink",
    color: "#FF2E93", // Single solid pink
    text: "#FFFFFF",
    sub: "rgba(255, 255, 255, 0.85)",
  },
  {
    id: "blue",
    name: "Blue",
    color: "#0066FF", // Single solid blue
    text: "#FFFFFF",
    sub: "rgba(255, 255, 255, 0.85)",
  },
  {
    id: "orange",
    name: "Orange",
    color: "#FF4D00", // Single solid signature orange
    text: "#FFFFFF",
    sub: "rgba(255, 255, 255, 0.85)",
  },
  {
    id: "emerald",
    name: "Emerald",
    color: "#10B981", // Single solid emerald green
    text: "#FFFFFF",
    sub: "rgba(255, 255, 255, 0.85)",
  },
  {
    id: "purple",
    name: "Purple",
    color: "#7C3AED", // Single solid purple
    text: "#FFFFFF",
    sub: "rgba(255, 255, 255, 0.85)",
  },
];

export default function ReloadingCurtain() {
  const [colorScheme, setColorScheme] = useState(CURTAIN_PALETTES[0]);
  const [phase, setPhase] = useState<"holding" | "wiping" | "idle">("holding");
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  // Initialize and rotate color on page reload / load
  useEffect(() => {
    let nextIdx = 0;
    try {
      const storedIdx = localStorage.getItem("ug_curtain_reload_idx");
      if (storedIdx !== null) {
        nextIdx = (parseInt(storedIdx, 10) + 1) % CURTAIN_PALETTES.length;
      }
      localStorage.setItem("ug_curtain_reload_idx", nextIdx.toString());
      setColorScheme(CURTAIN_PALETTES[nextIdx]);
    } catch {
      setColorScheme(CURTAIN_PALETTES[0]);
    }

    // Hold briefly to hide any DOM assembly, then trigger stagger wipe
    const holdTimer = setTimeout(() => {
      setPhase("wiping");
    }, 250);

    const finishTimer = setTimeout(() => {
      setPhase("idle");
    }, 1400);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  // Handle internal navigation transitions
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const currentUrl = window.location.pathname;
      const targetUrl = href.startsWith("/") ? href : `/${href}`;
      if (
        targetUrl === currentUrl ||
        `${targetUrl}/` === currentUrl ||
        targetUrl === `${currentUrl}/`
      ) {
        return;
      }

      // Rotate to next solid color on page transition
      try {
        const stored = localStorage.getItem("ug_curtain_reload_idx");
        const next = (parseInt(stored || "0", 10) + 1) % CURTAIN_PALETTES.length;
        localStorage.setItem("ug_curtain_reload_idx", next.toString());
        setColorScheme(CURTAIN_PALETTES[next]);
      } catch {}

      setPhase("holding");
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, []);

  // When pathname changes (after navigation), trigger the stagger wipe reveal
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setPhase("holding");
    const holdTimer = setTimeout(() => {
      setPhase("wiping");
    }, 200);
    const finishTimer = setTimeout(() => {
      setPhase("idle");
    }, 1400);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div
      id="ug-stagger-curtain"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999999,
        pointerEvents: phase === "wiping" ? "none" : "auto",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* 10 Vertical Strips - EXACT SAME UNIFORM SOLID COLOR (ONE COLOR PER RELOAD) */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
        // Stagger progression: 0s, 0.04s, 0.08s, 0.12s, 0.16s, 0.20s, 0.24s, 0.28s, 0.32s, 0.36s
        const delay = index * 0.04;

        return (
          <div
            key={index}
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: colorScheme.color,
              transform:
                phase === "wiping" ? "translateY(-101%)" : "translateY(0%)",
              transition: `transform 0.82s cubic-bezier(0.76, 0, 0.24, 1) ${delay}s`,
              willChange: "transform",
            }}
          />
        );
      })}

      {/* Center Branding with Official Ultimate Graphics Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform:
            phase === "wiping"
              ? "translate(-50%, -60%) scale(0.96)"
              : "translate(-50%, -50%) scale(1)",
          opacity: phase === "wiping" ? 0 : 1,
          transition: "opacity 0.25s ease, transform 0.25s ease",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 10,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          userSelect: "none",
          width: "90%",
          maxWidth: "750px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Official Main Logo */}
        <img
          src="/logos/main-logo.png"
          alt="Ultimate Graphics"
          style={{
            height: "clamp(55px, 9vw, 95px)",
            width: "auto",
            maxWidth: "85vw",
            objectFit: "contain",
            marginBottom: "1rem",
            filter:
              colorScheme.id === "yellow"
                ? "brightness(0)"
                : "brightness(0) invert(1)",
          }}
        />
        <div
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: colorScheme.sub,
          }}
        >
          (EST. 2014 — ARCHITECTURAL SIGNAGE &amp; FABRICATION)
        </div>
      </div>
    </div>
  );
}
