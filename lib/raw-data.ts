import fs from "fs";
import path from "path";

export interface RawPageData {
  styles: string;
  mainHtml: string;
  scripts: string;
}

/**
 * Normalizes broken relative URLs and outdated template link paths
 * into clean root-relative application routes.
 */
function sanitizeRawHtml(html: string): string {
  if (!html) return html;

  let sanitized = html
    // Fix legal pages relative links
    .replace(/href="(?:\.\/|\/)?terms-of-service"/g, 'href="/legal/terms-of-service"')
    .replace(/href="(?:\.\/|\/)?privacy-policy"/g, 'href="/legal/privacy-policy"')
    .replace(/href="\.\/legal\/terms-of-service"/g, 'href="/legal/terms-of-service"')
    .replace(/href="\.\/legal\/privacy-policy"/g, 'href="/legal/privacy-policy"')
    
    // Fix navigation relative links
    .replace(/href="\.\/work"/g, 'href="/work"')
    .replace(/href="\.\/about"/g, 'href="/about"')
    .replace(/href="\.\/contact"/g, 'href="/contact"')
    .replace(/href="\.\/blog"/g, 'href="/blog"')
    .replace(/href="\.\/404"/g, 'href="/"')
    .replace(/href="\.\.\/404"/g, 'href="/"')

    // Fix relative work case studies links
    .replace(/href="(?:\.\/)?box-mode"/g, 'href="/work/box-mode"')
    .replace(/href="(?:\.\/)?johny-nashville"/g, 'href="/work/johny-nashville"')
    .replace(/href="(?:\.\/)?nomad-stays"/g, 'href="/work/nomad-stays"')
    .replace(/href="(?:\.\/)?stackline"/g, 'href="/work/stackline"')
    .replace(/href="(?:\.\/)?we-run-brand"/g, 'href="/work/we-run-brand"')
    
    // Fix relative blog article links
    .replace(/how-to-pick-the-right-platform-framer-vs-Cast(?:%20|\s)Acrylic-vs-custom/g, 'how-to-pick-the-right-platform-framer-vs-webflow-vs-custom')
    .replace(/href="(?:\.\/|\.\.\/|\/)?(?:blog\/)?why-cheap-signage-fails-—-and-what-to-do-instead"/g, 'href="/blog/architectural-signage-specifications-guide"')
    .replace(/href="(?:\.\/|\.\.\/|\/)?(?:blog\/)?fleet-vehicle-branding-commercial-vans-and-trucks"/g, 'href="/blog/commercial-fleet-branding-maintenance"')
    .replace(/href="(?:\.\/|\.\.\/|\/)?(?:blog\/)?materials-guide-brass-stainless-steel-aluminum-signage"/g, 'href="/blog/fiber-laser-vs-waterjet-metal-signage"')
    .replace(/href="(?:\.\/|\.\.\/|\/)?(?:blog\/)?architectural-wayfinding-directional-signage-guide"/g, 'href="/blog/architectural-wayfinding-directional-signage-guide"')
    .replace(/href="(?:\.\/|\.\.\/|\/)?(?:blog\/)?led-illumination-front-lit-vs-halo-lit-channel-letters"/g, 'href="/blog/led-illumination-front-lit-vs-halo-lit-channel-letters"')
    .replace(/href="(?:\.\/|\.\.\/|\/)?(?:blog\/)?storefront-transformation-5-signs-that-elevate-foot-traffic"/g, 'href="/blog/storefront-transformation-5-signs-that-elevate-foot-traffic"')

    // Fix contact info & template socials
    .replace(/mailto:hello@mattertudio\.com/g, 'mailto:hello@ultimategraphics.com')
    .replace(/tel:555-400-0123/g, 'tel:+442079460192')
    .replace(/https:\/\/x\.com\/bynneh/g, 'https://x.com/ultimategraphics')
    .replace(/https:\/\/framer\.link\/bynneh/g, 'https://ultimategraphics.com')
    .replace(/https:\/\/templifica\.com\/?/g, 'https://ultimategraphics.com')
    .replace(/https:\/\/www\.trustpilot\.com\/?/g, 'https://g.page/r/CWCJQgHfoJUPEAE/review')
    
    // Normalize and cache-bust video streaming assets to avoid Chromium ERR_CACHE_OPERATION_NOT_SUPPORTED
    .replace(/https:\/\/framerusercontent\.com\/assets\/Upkc3M9FymIbhcQFUfu8txagv8\.mp4/g, '/assets/Upkc3M9FymIbhcQFUfu8txagv8.mp4?v=2')
    .replace(/\/assets\/Upkc3M9FymIbhcQFUfu8txagv8\.mp4(?!\?)/g, '/assets/Upkc3M9FymIbhcQFUfu8txagv8.mp4?v=2')
    .replace(/https:\/\/framerusercontent\.com\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4/g, '/assets/ug-background-video.mp4?v=ug_bg_v2')
    .replace(/\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4(?!\?)/g, '/assets/ug-background-video.mp4?v=ug_bg_v2')
    
    // Always bust cache on script_main bundle
    .replace(/\/sites\/3g9GswFgsc7j265E0PdXzi\/script_main\.fMOsSwwF\.mjs(?:\?v=[^"]*)?/g, '/sites/3g9GswFgsc7j265E0PdXzi/script_main.fMOsSwwF.mjs?v=ug_logo_v3')
    
    // Replace trust logo card image with user UG monogram
    .replace(/\/images\/zEI0hdyA7XwBgF3OgjoRGPVMk\.jpg(?:\?[^"]*)?/g, '/images/ug-monogram-gradient.jpg?v=ug_monogram_v1');

  // Inject Project Description input field into Framer quote forms if not already present
  if (!sanitized.includes('ug-description-row')) {
    const descriptionFieldHtml = `<label class="framer-4tlyn3 ug-description-row"><div class="framer-1fl5m7h" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv:var(--token-a6a442ab-37fd-449e-b679-15d23843839a, rgba(255, 255, 255, 0.6));transform:none"><p class="framer-text framer-styles-preset-18rrjz2" data-styles-preset="nLqxs6b6g" dir="auto" style="--framer-text-alignment:right;--framer-text-color:var(--extracted-r6o4lv, var(--token-a6a442ab-37fd-449e-b679-15d23843839a, rgba(255, 255, 255, 0.6)))">Project Description</p></div><div class="framer-kalcux ug-desc-box-wrapper" data-border="true"><div class="framer-form-text-input framer-form-input-wrapper framer-form-textarea-input-type" style="width:100%;height:auto;background:transparent;"><textarea name="Message" placeholder="Describe your project: dimensions, materials, location, or timeline..." class="framer-form-input ug-desc-textarea"></textarea></div></div></label>`;
    if (sanitized.includes('class="framer-vx7pd3"')) {
      sanitized = sanitized.replace(/(<div class="framer-vx7pd3">)/g, `${descriptionFieldHtml}$1`);
    } else if (sanitized.includes('class="framer-1eb86mh"')) {
      sanitized = sanitized.replace(/(<div class="framer-1eb86mh"[^>]*>)/g, `${descriptionFieldHtml}$1`);
    }
  }

  return sanitized;
}

export function getRawPageData(fileName: string): RawPageData {
  const filePath = path.join(process.cwd(), "app", "_raw", fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Raw page data file not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(content) as RawPageData;

  return {
    ...parsed,
    mainHtml: sanitizeRawHtml(parsed.mainHtml),
    scripts: sanitizeRawHtml(parsed.scripts || ""),
  };
}
