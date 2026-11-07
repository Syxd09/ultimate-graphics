"use client";

import { useEffect } from "react";

export default function FramerScriptsRunner({ scriptsHtml }: { scriptsHtml: string }) {
  useEffect(() => {
    if (!scriptsHtml) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = scriptsHtml;

    const scripts = Array.from(tempDiv.querySelectorAll("script"));

    for (const oldScript of scripts) {
      // Check if already injected
      if (oldScript.id && document.getElementById(oldScript.id)) {
        continue;
      }

      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      document.body.appendChild(newScript);
    }
  }, [scriptsHtml]);

  return null;
}

