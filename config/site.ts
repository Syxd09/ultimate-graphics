import aboutJson from "@/data/about.json";

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
    googleReviews?: string;
  };
  navigation: NavItem[];
}

export const siteConfig: SiteConfig = {
  ...aboutJson,
  navigation: [
    { label: "Home", href: "/" },
    { label: "Works", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
};
