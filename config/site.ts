export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  established: string;
  description: string;
  url: string;
  logos: {
    main: string;
    footer: string;
    symbol: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
    hours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    sla: string;
  };
  director: {
    name: string;
    title: string;
    quote: string;
    avatar: string;
  };
  socials: {
    instagram: string;
    twitter: string;
  };
  navigation: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Ultimate Graphics®",
  legalName: "Ultimate Graphics London Ltd",
  tagline: "Premier Architectural Signage, 12kW Fiber Laser, 5-Axis CNC & Commercial Fleet Studio",
  established: "2014",
  description:
    "London architectural signage and commercial fabrication studio established in 2014. In-house 12kW fiber laser cutting, 5-axis CNC routing, illuminated channel letters, and 3M certified fleet branding with 2-hour quote SLA.",
  url: "https://ultimategraphics.com",
  logos: {
    main: "/logos/main-logo.png",
    footer: "/logos/footer-logo.png",
    symbol: "/logos/symbol-logo.jpeg",
  },
  contact: {
    phone: "+1 (555) 400 2014",
    phoneDisplay: "+1 (555) 400 2014",
    email: "hello@ultimategraphics.com",
    address: "124 Industrial Way",
    city: "London",
    postcode: "EC1V 2NX",
    country: "United Kingdom",
    hours: {
      weekdays: "Mon–Fri: 09:00 – 18:00",
      saturday: "Sat: 10:00 – 16:00",
      sunday: "Closed",
    },
    sla: "We usually respond to all signage & print enquiries within 2 business hours.",
  },
  director: {
    name: "David Miller",
    title: "Production & Signage Director",
    quote: "I'll personally review your signage & print brief and get back to you within two hours.",
    avatar: "/images/wlJMtkRVckBTirLzGQd8qmCMDw.jpg?width=83&height=83",
  },
  socials: {
    instagram: "https://www.instagram.com/",
    twitter: "https://x.com/bynneh",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Works", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
};

