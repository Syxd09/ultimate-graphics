export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  specs: string;
  iconNumber: string;
  featured: boolean;
}

export const servicesData: Service[] = [
  {
    id: "laser-cutting",
    title: "12kW Fiber Laser Cutting",
    shortDesc: "Ultra-precision metal profiling for architectural facades, stainless steel letters, brass panels, and aluminum frameworks up to 25mm thickness.",
    specs: "±0.02mm accuracy • Nitrogen-assist cutting • Clean oxide-free edges",
    iconNumber: "01",
    featured: true,
  },
  {
    id: "cnc-routing",
    title: "5-Axis CNC Routing",
    shortDesc: "High-speed multi-axis 3D carving and sheet profiling for timber, acrylic, composite panels (ACM), and structural plastics.",
    specs: "3000x2000mm bed • Automatic tool changer • Micro-edge finishing",
    iconNumber: "02",
    featured: true,
  },
  {
    id: "channel-letters",
    title: "Illuminated 3D Channel Letters",
    shortDesc: "Custom built-up metal and acrylic lettering with front-lit, halo-lit, or dual-illumination options powered by IP67 commercial grade LEDs.",
    specs: "Automated flange bending • Laser welded seams • UL & CE certified",
    iconNumber: "03",
    featured: true,
  },
  {
    id: "vehicle-fleet",
    title: "3M Commercial Fleet Branding",
    shortDesc: "Full and partial vehicle wraps, fleet livery, and reflective safety markings engineered for commercial transit durability.",
    specs: "3M Certified installers • Temperature-controlled bay • 7-year film warranty",
    iconNumber: "04",
    featured: true,
  },
  {
    id: "cabinet-signs",
    title: "Architectural Cabinet Signs",
    shortDesc: "Extruded aluminum profile lightboxes, push-through acrylic graphics, and station-grade wayfinding totems built for heavy pedestrian environments.",
    specs: "Powder-coated finishes • Photocell sensors • Wind-load calculated",
    iconNumber: "05",
    featured: true,
  },
  {
    id: "neon-digital",
    title: "Bespoke Neon & Digital Signage",
    shortDesc: "Handcrafted glass neon artistic features alongside commercial ultra-bright 4K digital display totems with cloud CMS management.",
    specs: "2500 nits daylight readable • Ambient light auto-dim • Commercial duty 24/7",
    iconNumber: "06",
    featured: true,
  },
  {
    id: "glass-manifestation",
    title: "Glass Manifestation & Frosting",
    shortDesc: "Building regulation compliant window manifestation dots, bespoke gradient privacy films, and high-contrast etched vinyl for corporate offices.",
    specs: "DDA compliant • UV stable • Anti-bubble air-release installation",
    iconNumber: "07",
    featured: false,
  },
  {
    id: "large-format-uv",
    title: "Direct UV Flatbed Printing",
    shortDesc: "Large format direct-to-substrate printing on aluminum composite, acrylic, foamex, timber, and sunboard with white ink and gloss varnish layers.",
    specs: "1200 DPI resolution • Scratch-resistant UV curing • Roll-to-roll & rigid",
    iconNumber: "08",
    featured: false,
  },
];

