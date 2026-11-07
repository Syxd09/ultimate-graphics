export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const blogPostsData: BlogPost[] = [
  {
    slug: "architectural-signage-specifications-guide",
    title: "The Architect's Guide to Exterior Signage Specifications & Material Selection",
    subtitle: "Navigating wind load calculations, alloy grades, and illumination longevity.",
    category: "Technical Guide",
    date: "February 2026",
    readTime: "6 min read",
    image: "/images/qWv5OBNRreRPv9FqvBaNWdZK4.jpg?width=564&height=375",
    excerpt: "Why specifying the correct aluminum alloy and IP-rated LED enclosure is the difference between a pristine architectural facade and water ingress within 18 months.",
    content: [
      "When specifying exterior commercial signage, the most frequent failure point isn't aesthetic — it's galvanic corrosion and improper thermal expansion allowances between dissimilar metals.",
      "In British and European climates, rapid temperature cycling from -5°C in winter to direct 35°C solar loading on dark facades creates substantial movement across 3-meter spans.",
      "At Ultimate Graphics, we machine all structural chassis from 5083 marine-grade aluminum and isolate all stainless steel fasteners with vulcanized neoprene bushings to prevent electrolytic pitting.",
      "Always ensure all power supplies are remote-accessible in weatherproof IP67 utility chambers with ventilation breathers to eliminate condensation accumulation."
    ],
  },
  {
    slug: "fiber-laser-vs-waterjet-metal-signage",
    title: "12kW Fiber Laser vs Waterjet: Which Cutting Technology Suits Your Facade?",
    subtitle: "A detailed comparison of edge finish, heat affected zones, and cycle speeds.",
    category: "Fabrication",
    date: "January 2026",
    readTime: "5 min read",
    image: "/images/VhyohSgiQO3sBPZXatgzi0sVXFI.png?width=1920&height=1176",
    excerpt: "Exploring the nuances of nitrogen-assist fiber laser cutting versus abrasive waterjet profiling for architectural cladding and lettering.",
    content: [
      "With the introduction of our in-house 12kW fiber laser cutting bed in London, cutting tolerances have narrowed to an extraordinary ±0.02mm across thick structural plates.",
      "Nitrogen-assist cutting delivers bright, oxide-free edge finishes on stainless steel and aluminum, eliminating the secondary deburring and grinding required for immediate powder-coat adhesion.",
      "While waterjet excels at extreme thickness composites beyond 40mm, the speed, intricate kerf control, and cost-efficiency of 12kW fiber lasers make it the premier choice for modern architectural signage.",
    ],
  },
  {
    slug: "commercial-fleet-branding-maintenance",
    title: "Maximizing Fleet Branding ROI: 3M Cast Vinyl Installation & Care",
    subtitle: "Ensuring 7+ year durability across high-mileage commercial delivery vehicles.",
    category: "Fleet Branding",
    date: "December 2025",
    readTime: "4 min read",
    image: "/images/AZdKLugP6NzACkX2hBYq9K4wFQ.jpg",
    excerpt: "How proper surface decontamination, post-heating recessed channels, and ceramic coating extend commercial vinyl wrap lifespan.",
    content: [
      "Commercial transit vehicles face relentless environmental abrasion from road grime, UV exposure, and automated high-pressure wash systems.",
      "Our climate-controlled application bays guarantee optimal 21°C surface temperatures during film stretching, eliminating adhesive failure over deep panel recesses.",
      "Using genuine 3M cast films paired with optically clear overlaminates prevents UV fading and provides resistance against chemical spills and fuel spills.",
    ],
  },
];

