"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ContactFormInterceptor() {
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Strictly do not intercept internal admin panel forms or API routes
    if (typeof window === "undefined" || window.location.pathname.startsWith("/admin")) return;

    // Upgrade native selects into sleek dark architectural dropdowns
    const upgradeSelectDropdown = (form: HTMLFormElement) => {
      if (form.closest(".admin-dashboard") || form.getAttribute("data-admin-form") === "true") return;

      const selects = form.querySelectorAll<HTMLSelectElement>("select[name='Location'], select");
      if (!selects || selects.length === 0) return;

      selects.forEach((select) => {
        const wrapper = select.parentElement;
        if (!wrapper) return;

        // If already attached and the custom dropdown DOM element is still alive in the wrapper, skip
        if (
          select.getAttribute("data-custom-dropdown-attached") === "true" &&
          wrapper.querySelector(".ug-custom-dropdown")
        ) {
          return;
        }

        select.setAttribute("data-custom-dropdown-attached", "true");

        // Visually hide native select while preserving it for form data and accessibility
        select.style.cssText =
          "position: absolute !important; opacity: 0 !important; pointer-events: none !important; width: 1px !important; height: 1px !important; z-index: -1 !important;";

        // Unclip parent containers so dropdown floating menu isn't clipped
        let cur: HTMLElement | null = wrapper;
        while (cur && cur !== document.body) {
          cur.style.setProperty("overflow", "visible", "important");
          if (cur.tagName === "FORM") break;
          cur = cur.parentElement;
        }

        // Clean up any stale dropdown in the wrapper before attaching a fresh one
        wrapper.querySelectorAll(".ug-custom-dropdown").forEach((el) => el.remove());

        // Determine if form is inside dark footer or light page container
        const isFooter = !!form.closest("footer, .framer-24skgi");
        const themeClass = isFooter ? "ug-theme-dark" : "ug-theme-light";

        const dropdownContainer = document.createElement("div");
        dropdownContainer.className = `ug-custom-dropdown ${themeClass}`;

        const currentOption = select.options[select.selectedIndex] || select.options[0];
        const currentText = currentOption ? currentOption.text : "Select Capability...";

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = `ug-dropdown-trigger ${themeClass}`;
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
        trigger.innerHTML = `
          <span class="ug-dropdown-selected-text">${currentText}</span>
          <svg class="ug-dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.75L6 6.25L10.5 1.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>
          </svg>
        `;

        const menu = document.createElement("div");
        menu.className = "ug-dropdown-menu";
        menu.setAttribute("role", "listbox");
        menu.style.setProperty("display", "none", "important");

        const closeMenu = () => {
          dropdownContainer.classList.remove("is-open");
          trigger.classList.remove("is-open");
          menu.classList.remove("is-open");
          menu.style.setProperty("display", "none", "important");
          trigger.setAttribute("aria-expanded", "false");
          dropdownContainer.style.removeProperty("z-index");
          if (wrapper) wrapper.style.removeProperty("z-index");
        };

        const renderOptions = () => {
          menu.innerHTML = "";
          Array.from(select.options).forEach((opt) => {
            const isSelected = opt.value === select.value || (opt.selected && !select.value);
            const item = document.createElement("div");
            item.className = "ug-dropdown-item" + (isSelected ? " is-selected" : "");
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", isSelected ? "true" : "false");
            item.setAttribute("data-value", opt.value);
            item.innerHTML = `
              <span>${opt.text}</span>
              ${
                isSelected
                  ? `<svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1.5 5L4.5 8L10.5 1.5" stroke="#ff4500" stroke-width="2" stroke-linecap="square"/></svg>`
                  : ""
              }
            `;

            item.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              // Immediately close menu
              closeMenu();

              // Update select value
              select.value = opt.value;

              // Update trigger text
              const selectedTextSpan = trigger.querySelector(".ug-dropdown-selected-text");
              if (selectedTextSpan) selectedTextSpan.textContent = opt.text;

              // Dispatch events to notify React/Framer
              select.dispatchEvent(new Event("input", { bubbles: true }));
              select.dispatchEvent(new Event("change", { bubbles: true }));
            });

            menu.appendChild(item);
          });
        };

        const openMenu = () => {
          // Close all other dropdowns across the page
          document.querySelectorAll(".ug-custom-dropdown.is-open").forEach((dd) => {
            dd.classList.remove("is-open");
            dd.querySelectorAll(".ug-dropdown-trigger.is-open, .ug-dropdown-menu.is-open").forEach((el) => {
              el.classList.remove("is-open");
              if (el.classList.contains("ug-dropdown-menu")) {
                (el as HTMLElement).style.setProperty("display", "none", "important");
              }
            });
          });

          renderOptions();
          dropdownContainer.classList.add("is-open");
          trigger.classList.add("is-open");
          menu.classList.add("is-open");
          menu.style.setProperty("display", "flex", "important");
          trigger.setAttribute("aria-expanded", "true");
          dropdownContainer.style.setProperty("z-index", "999999", "important");
          if (wrapper) wrapper.style.setProperty("z-index", "99999", "important");
        };

        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = dropdownContainer.classList.contains("is-open") || trigger.classList.contains("is-open");
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        });

        select.addEventListener("change", () => {
          const active = select.options[select.selectedIndex];
          if (active) {
            const selectedTextSpan = trigger.querySelector(".ug-dropdown-selected-text");
            if (selectedTextSpan) selectedTextSpan.textContent = active.text;
          }
        });

        dropdownContainer.appendChild(trigger);
        dropdownContainer.appendChild(menu);
        wrapper.appendChild(dropdownContainer);
      });
    };

    // Ensure description textarea is present and matches the architectural theme
    const injectDescriptionField = () => {
      const forms = document.querySelectorAll<HTMLFormElement>(
        "form[data-framer-form], form.framer-1quigvc, form.framer-24skgi, footer form, [data-framer-name*='Contact' i] form"
      );

      forms.forEach((form) => {
        if (form.closest(".admin-dashboard") || form.getAttribute("data-admin-form") === "true") {
          return;
        }

        // Upgrade select dropdown to luxury dark theme
        upgradeSelectDropdown(form);

        // Check if description textarea already exists in this form
        if (form.querySelector(".ug-description-row") || form.querySelector("textarea[name='Message']")) {
          return;
        }

        // Find insertion target: submit button container
        const submitTarget = form.querySelector(
          ".framer-vx7pd3, .framer-1eb86mh, [data-framer-name*='Button' i], button[type='submit']"
        );

        if (submitTarget) {
          const isFooter = !!form.closest("footer, .framer-24skgi");
          const themeClass = isFooter ? "ug-theme-dark" : "ug-theme-light";

          const descRow = document.createElement("label");
          descRow.className = `framer-4tlyn3 ug-description-row ${themeClass}`;
          descRow.style.cssText =
            "display: flex !important; flex-direction: column !important; align-items: flex-end !important; gap: 10px !important; width: 100% !important; margin-top: 4px !important; margin-bottom: 4px !important; position: relative !important;";
          descRow.innerHTML = `
            <div class="framer-1fl5m7h" data-framer-component-type="RichTextContainer" style="transform:none">
              <p class="framer-text framer-styles-preset-18rrjz2" data-styles-preset="nLqxs6b6g" dir="auto" style="--framer-text-alignment:right;">Project Description</p>
            </div>
            <div class="framer-kalcux ug-desc-box-wrapper ${themeClass}" data-border="true" style="width:100% !important; display:flex !important; box-sizing:border-box !important; background:transparent !important; border-radius:0px !important;">
              <div class="framer-form-text-input framer-form-input-wrapper framer-form-textarea-input-type" style="width:100% !important; height:auto !important; background:transparent !important;">
                <textarea name="Message" placeholder="Describe what you need: dimensions, materials, location, or project brief..." class="framer-form-input ug-desc-textarea ${themeClass}" style="width:100% !important; min-height:105px !important; background:transparent !important; border:none !important; outline:none !important; font-family:'Geist',sans-serif !important; font-size:14px !important; font-weight:500 !important; line-height:1.5 !important; padding:14px 16px !important; box-sizing:border-box !important; resize:vertical !important; display:block !important; border-radius:0px !important;"></textarea>
              </div>
            </div>
          `;
          submitTarget.parentNode?.insertBefore(descRow, submitTarget);
        }
      });
    };

    // Run immediately
    injectDescriptionField();

    // Observe dynamic hydration and re-renders
    const observer = new MutationObserver(() => {
      injectDescriptionField();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Periodic triggers for early page lifecycle
    const timer1 = setTimeout(injectDescriptionField, 300);
    const timer2 = setTimeout(injectDescriptionField, 800);
    const timer3 = setTimeout(injectDescriptionField, 1500);
    const timer4 = setTimeout(injectDescriptionField, 3000);

    // Global document-level capture listener for form submission
    const handleGlobalSubmit = async (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (!form || !form.tagName || form.tagName.toUpperCase() !== "FORM") return;
      if (form.closest(".admin-dashboard") || form.getAttribute("data-admin-form") === "true") return;
      if (window.location.pathname.startsWith("/admin")) return;

      const isQuoteForm =
        form.hasAttribute("data-framer-form") ||
        form.classList.contains("framer-24skgi") ||
        form.classList.contains("framer-1quigvc") ||
        form.closest("footer") !== null ||
        form.querySelector("[name='Location']") !== null;

      if (!isQuoteForm) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      const submitBtn = form.querySelector<HTMLButtonElement>("button[type='submit'], input[type='submit'], button");
      const originalBtnText = submitBtn ? submitBtn.innerText : "Submit";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Transmitting Specification...";
        submitBtn.style.opacity = "0.7";
      }

      try {
        const formData = new FormData(form);
        const rawEntries: Record<string, string> = {};
        formData.forEach((val, key) => {
          rawEntries[key] = String(val);
        });

        const textInputs = Array.from(form.querySelectorAll<HTMLInputElement>("input[type='text'], input:not([type])"));
        const emailInput = form.querySelector<HTMLInputElement>("input[type='email'], input[placeholder*='email' i]");
        const selectElement = form.querySelector<HTMLSelectElement>("select");
        const textareaElement = form.querySelector<HTMLTextAreaElement>("textarea");

        const nameVal =
          rawEntries["Name"] ||
          rawEntries["name"] ||
          textInputs.find((i) => i.placeholder.toLowerCase().includes("alex") || i.placeholder.toLowerCase().includes("name"))?.value ||
          textInputs[0]?.value ||
          "Client";

        const emailVal =
          emailInput?.value ||
          rawEntries["Email"] ||
          textInputs.find((i) => i.placeholder.toLowerCase().includes("email") || i.value.includes("@"))?.value ||
          rawEntries["email"] ||
          "";

        const serviceVal =
          selectElement?.value ||
          rawEntries["Location"] ||
          rawEntries["service"] ||
          "General Signage & Fabrication Enquiry";

        const messageVal =
          textareaElement?.value ||
          rawEntries["Message"] ||
          rawEntries["message"] ||
          rawEntries["description"] ||
          "";

        const pageSource = window.location.pathname === "/" ? "Homepage Footer Quote Form" : `${window.location.pathname} Form`;

        const payload = {
          name: nameVal,
          email: emailVal,
          service: serviceVal,
          message: messageVal,
          source: pageSource,
          website: rawEntries["website"] || "",
        };

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to submit quote request. Please try again.");
        }

        setToast({
          type: "success",
          message: "Quote request received! Our engineering team will review your specifications within 2 business hours.",
        });

        form.reset();
        if (textareaElement) textareaElement.value = "";

        // Reset custom dropdown display
        if (selectElement) {
          const firstOpt = selectElement.options[0];
          if (firstOpt) {
            selectElement.value = firstOpt.value;
            const triggerText = form.querySelector(".ug-dropdown-selected-text");
            if (triggerText) triggerText.textContent = firstOpt.text;
          }
        }

        let existingSuccess = form.querySelector(".ug-form-success-banner");
        if (!existingSuccess) {
          const banner = document.createElement("div");
          banner.className = "ug-form-success-banner";
          banner.style.cssText = `
            margin: 1.5rem 0;
            padding: 1.5rem;
            background-color: rgba(16, 185, 129, 0.15);
            border: 1px solid #10B981;
            border-radius: 0px;
            color: #ffffff;
            text-align: center;
            font-family: inherit;
            animation: ugFadeIn 0.3s ease;
          `;
          banner.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;">
              <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background-color:#10B981;"></span>
              <strong style="color:#10B981;font-size:1.15rem;">Specification Received</strong>
            </div>
            <p style="margin:0;font-size:0.9rem;color:rgba(255,255,255,0.85);line-height:1.5;">
              Your enquiry has been logged into our facility queue. We aim for a 2-hour response during operating hours.
            </p>
          `;
          form.prepend(banner);
        }
      } catch (err: any) {
        console.error("Contact form submission error:", err);
        setToast({
          type: "error",
          message: err.message || "Failed to transmit inquiry. Please email us directly.",
        });
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
          submitBtn.style.opacity = "1";
        }
      }
    };

    const handleOutsideClick = (e: Event) => {
      const openDropdowns = document.querySelectorAll(".ug-custom-dropdown.is-open");
      if (openDropdowns.length === 0) return;
      openDropdowns.forEach((dd) => {
        if (!dd.contains(e.target as Node)) {
          dd.classList.remove("is-open");
          dd.querySelectorAll(".ug-dropdown-trigger.is-open, .ug-dropdown-menu.is-open").forEach((el) => {
            el.classList.remove("is-open");
            if (el.classList.contains("ug-dropdown-menu")) {
              (el as HTMLElement).style.setProperty("display", "none", "important");
            }
          });
          const trigger = dd.querySelector(".ug-dropdown-trigger");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
          (dd as HTMLElement).style.removeProperty("z-index");
          const parent = dd.parentElement;
          if (parent) parent.style.removeProperty("z-index");
        }
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".ug-custom-dropdown.is-open").forEach((dd) => {
          dd.classList.remove("is-open");
          dd.querySelectorAll(".ug-dropdown-trigger.is-open, .ug-dropdown-menu.is-open").forEach((el) => {
            el.classList.remove("is-open");
            if (el.classList.contains("ug-dropdown-menu")) {
              (el as HTMLElement).style.setProperty("display", "none", "important");
            }
          });
          const trigger = dd.querySelector(".ug-dropdown-trigger");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
          (dd as HTMLElement).style.removeProperty("z-index");
          const parent = dd.parentElement;
          if (parent) parent.style.removeProperty("z-index");
        });
      }
    };

    window.addEventListener("pointerdown", handleOutsideClick, true);
    window.addEventListener("click", handleOutsideClick, true);
    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("submit", handleGlobalSubmit, true);

    return () => {
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.removeEventListener("submit", handleGlobalSubmit, true);
      window.removeEventListener("pointerdown", handleOutsideClick, true);
      window.removeEventListener("click", handleOutsideClick, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin") || !toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999999,
        maxWidth: "420px",
        padding: "16px 20px",
        backgroundColor: toast.type === "success" ? "#062817" : "#3b0808",
        border: `1px solid ${toast.type === "success" ? "#10B981" : "#ef4444"}`,
        borderRadius: "0px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        color: "#ffffff",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: toast.type === "success" ? "#10B981" : "#ef4444",
          marginTop: "6px",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, fontSize: "0.9rem", lineHeight: 1.4 }}>
        <div style={{ fontWeight: 600, marginBottom: "4px" }}>
          {toast.type === "success" ? "Enquiry Confirmed" : "Submission Error"}
        </div>
        <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.85rem" }}>
          {toast.message}
        </div>
      </div>
      <button
        onClick={() => setToast(null)}
        style={{
          background: "none",
          border: "none",
          color: "rgba(255, 255, 255, 0.5)",
          cursor: "pointer",
          fontSize: "1.1rem",
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}
