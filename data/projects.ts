import projectsJson from "./projects.json";

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

export const projectsData: Project[] = projectsJson as Project[];
