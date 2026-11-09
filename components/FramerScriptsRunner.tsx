"use client";

import { useEffect } from "react";

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export default function FramerScriptsRunner({ scriptsHtml }: { scriptsHtml: string }) {
  useEffect(() => {
    if (!scriptsHtml || typeof window === "undefined") return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = scriptsHtml;

    const scripts = Array.from(tempDiv.querySelectorAll("script"));

    for (const oldScript of scripts) {
      const scriptId =
        oldScript.id ||
        (oldScript.src
          ? `framer-src-${simpleHash(oldScript.src)}`
          : `framer-inline-${simpleHash((oldScript.textContent || "").slice(0, 200))}`);

      // Avoid re-injecting existing scripts
      if (document.getElementById(scriptId)) {
        continue;
      }

      const newScript = document.createElement("script");
      newScript.id = scriptId;
      Array.from(oldScript.attributes).forEach((attr) => {
        if (attr.name !== "id") {
          newScript.setAttribute(attr.name, attr.value);
        }
      });

      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      newScript.setAttribute("data-framer-injected", "true");
      document.body.appendChild(newScript);
    }
  }, [scriptsHtml]);

  return null;
}
