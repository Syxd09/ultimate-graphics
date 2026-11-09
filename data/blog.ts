import blogJson from "./blog.json";

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

export const blogPostsData: BlogPost[] = blogJson as BlogPost[];
