export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "box-mode",
    slug: "box-mode",
    title: "Box Mode",
    subtitle: "High-Volume Modular Signage & Distribution Facility",
    client: "Box Mode Global",
    year: "2026",
    category: "Wayfinding & Architectural",
    tags: ["Architectural Signage", "12kW Laser", "Wayfinding Totems"],
    image: "/images/qWv5OBNRreRPv9FqvBaNWdZK4.jpg?width=564&height=375",
    summary: "Complete fabrication of exterior modular architectural monument signs, laser-cut directional totems, and facility wayfinding for a 120,000 sq ft logistics depot.",
    challenge: "High wind exposure, 24/7 industrial truck traffic, and stringent structural safety requirements requiring certified engineering sign-off.",
    solution: "Heavy-gauge 5083 marine aluminum internal chassis with modular powder-coated pan faces, laser-cut stencil lettering, and high-intensity amber LED edge illumination.",
    results: [
      { label: "Fabrication Turnaround", value: "14 Days" },
      { label: "Wind Load Rating", value: "140 mph" },
      { label: "Warranty", value: "10 Years" },
    ],
    featured: true,
  },
  {
    id: "johny-nashville",
    slug: "johny-nashville",
    title: "Johny Nashville / Lumina Creative",
    subtitle: "Acoustic-Integrated Illuminated Studio Branding",
    client: "Lumina Entertainment & Media",
    year: "2026",
    category: "Bespoke Illuminated Signage",
    tags: ["CNC & Laser Fabrication", "Cabinet Signs", "Channel Letters"],
    image: "/images/VhyohSgiQO3sBPZXatgzi0sVXFI.png?width=1920&height=1176",
    summary: "Precision 5-axis CNC routed acoustic slat paneling integrated with mirror-polished gold PVD stainless steel channel letters and diffuse 2700K halo lighting.",
    challenge: "Zero-resonance requirement inside recording broadcast studios, eliminating all vibration and electrical hum from sign transformers.",
    solution: "Remotely housed solid-state Mean Well drivers with custom anti-vibration neoprene standoffs and acoustically tuned walnut backing baffles.",
    results: [
      { label: "Noise Rating", value: "0 dB Silent" },
      { label: "LED Life Expectancy", value: "65,000 hrs" },
      { label: "Client Satisfaction", value: "100%" },
    ],
    featured: true,
  },
  {
    id: "nomad-stays",
    slug: "nomad-stays",
    title: "Nomad Stays",
    subtitle: "Boutique Hospitality Exterior Identity & Wayfinding",
    client: "Nomad Hospitality Group",
    year: "2025",
    category: "Hospitality Signage",
    tags: ["3D Channel Letters", "Bronze Patina", "Warm Glow LEDs"],
    image: "/images/AZdKLugP6NzACkX2hBYq9K4wFQ.jpg",
    summary: "Bespoke distressed solid brass letter sets, hand-patinated facade plaques, and floor-level subtle wayfinding inlays across 4 London boutique hotel sites.",
    challenge: "Adhering to Grade II listed building regulations requiring non-destructive mortar anchoring and historical finish approvals.",
    solution: "Bespoke custom-threaded masonry anchors matching mortar joints, hand-rubbed antique bronze with protective microcrystalline wax seal.",
    results: [
      { label: "Heritage Approval", value: "First Pass" },
      { label: "Sites Installed", value: "4 Locations" },
      { label: "Finish Longevity", value: "15+ Years" },
    ],
    featured: true,
  },
  {
    id: "stackline",
    slug: "stackline",
    title: "Stackline Headquarters",
    subtitle: "Multi-Storey Corporate Headquarters Glass & Facade Identity",
    client: "Stackline Technologies",
    year: "2025",
    category: "Corporate Branding",
    tags: ["Glass Manifestation", "Powder Coated Steel", "Atrium Totem"],
    image: "/images/qWv5OBNRreRPv9FqvBaNWdZK4.jpg?width=564&height=375",
    summary: "Architectural 6-meter freestanding monolithic lobby totem in blackened steel with embedded OLED display and full building glass privacy manifestations.",
    challenge: "Installation inside a fully operational commercial atrium with restrictive floor load constraints and crane access limits.",
    solution: "Engineered segmented modular steel armature assembled on site with concealed structural interlocking pins and distributed spreader plates.",
    results: [
      { label: "Height", value: "6.2 Meters" },
      { label: "Glass Installed", value: "850 sqm" },
      { label: "Installation Time", value: "1 Weekend" },
    ],
    featured: true,
  },
  {
    id: "we-run-brand",
    slug: "we-run-brand",
    title: "We Run Brand Fleet",
    subtitle: "High-Durability Commercial Fleet Livery",
    client: "We Run Logistics",
    year: "2025",
    category: "Commercial Fleet Livery",
    tags: ["3M Cast Vinyl", "Fleet Wraps", "Reflective Livery"],
    image: "/images/VhyohSgiQO3sBPZXatgzi0sVXFI.png?width=1920&height=1176",
    summary: "Standardized 3M IJ180mC cast wrap execution across 45 commercial delivery vans with overnight turnarounds to minimize vehicle downtime.",
    challenge: "Minimizing fleet downtime during peak operational quarters while ensuring 100% color and alignment consistency across 4 different van body variants.",
    solution: "Pre-cut template library with digitally color-matched multi-panel indexing and a dedicated 4-van climate bay operating double shifts.",
    results: [
      { label: "Vehicles Branded", value: "45 Vans" },
      { label: "Turnaround / Van", value: "6 Hours" },
      { label: "Film Warranty", value: "7 Years 3M" },
    ],
    featured: true,
  },
];

