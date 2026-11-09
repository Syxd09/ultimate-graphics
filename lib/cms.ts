import fs from "fs/promises";
import path from "path";

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

export interface AboutConfig {
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
  facility?: {
    size: string;
    location: string;
    machinery: { name: string; specs: string }[];
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
}

const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const BLOG_FILE = path.join(DATA_DIR, "blog.json");
const ABOUT_FILE = path.join(DATA_DIR, "about.json");

async function ensureDirectory(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

async function atomicWrite(filePath: string, data: any): Promise<void> {
  await ensureDirectory();
  const tempPath = `${filePath}.tmp.${Date.now()}.${Math.random().toString(36).substring(7)}`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tempPath, filePath);
}

// ---------------- PROJECTS / WORKS ----------------

export async function getProjects(): Promise<Project[]> {
  await ensureDirectory();
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await atomicWrite(PROJECTS_FILE, projects);
}

export async function addProject(newProject: Omit<Project, "id"> & { id?: string }): Promise<Project> {
  const all = await getProjects();
  const slug = (newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/(^-|-$)/g, "");
  const project: Project = {
    ...newProject,
    id: newProject.id || slug || `project-${Date.now()}`,
    slug,
  };
  all.unshift(project);
  await saveProjects(all);
  return project;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const all = await getProjects();
  const index = all.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;

  const updated: Project = {
    ...all[index],
    ...updates,
    id: all[index].id,
  };
  all[index] = updated;
  await saveProjects(all);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const all = await getProjects();
  const filtered = all.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length === all.length) return false;
  await saveProjects(filtered);
  return true;
}

// ---------------- BLOG POSTS ----------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  await ensureDirectory();
  try {
    const raw = await fs.readFile(BLOG_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await atomicWrite(BLOG_FILE, posts);
}

export async function addBlogPost(newPost: BlogPost): Promise<BlogPost> {
  const all = await getBlogPosts();
  const slug = (newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).replace(/(^-|-$)/g, "");
  const post: BlogPost = {
    ...newPost,
    slug,
  };
  all.unshift(post);
  await saveBlogPosts(all);
  return post;
}

export async function updateBlogPost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const updated: BlogPost = {
    ...all[index],
    ...updates,
    slug: updates.slug || all[index].slug,
  };
  all[index] = updated;
  await saveBlogPosts(all);
  return updated;
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const all = await getBlogPosts();
  const filtered = all.filter((p) => p.slug !== slug);
  if (filtered.length === all.length) return false;
  await saveBlogPosts(filtered);
  return true;
}

// ---------------- ABOUT & SITE CONFIG ----------------

export async function getAboutConfig(): Promise<AboutConfig> {
  await ensureDirectory();
  try {
    const raw = await fs.readFile(ABOUT_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return {} as AboutConfig;
  }
}

export async function saveAboutConfig(config: AboutConfig): Promise<void> {
  await atomicWrite(ABOUT_FILE, config);
}

export async function updateAboutConfig(updates: Partial<AboutConfig>): Promise<AboutConfig> {
  const current = await getAboutConfig();
  const merged: AboutConfig = {
    ...current,
    ...updates,
    contact: {
      ...current.contact,
      ...(updates.contact || {}),
      hours: {
        ...current.contact?.hours,
        ...(updates.contact?.hours || {}),
      },
    },
    director: {
      ...current.director,
      ...(updates.director || {}),
    },
    socials: {
      ...current.socials,
      ...(updates.socials || {}),
    },
  };
  await saveAboutConfig(merged);
  return merged;
}
