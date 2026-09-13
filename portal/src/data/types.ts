export interface CaseStudy {
  slug: string;
  title: string;
  organization: string;
  role: string;
  period?: string;
  tags: string[];
  summary: string;
  problem: string;
  approach: string[];
  myRole: string;
  outcome: string;
  learnings?: string;
  images?: string[];
  askPrompt?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  tech: string[];
  githubUrl?: string;
  askPrompt?: string;
}

export type ResourceCategory = "AI" | "Consulting" | "Technical";
export type ResourceType = "PDF" | "Excel" | "Word" | "GitHub" | "PPT";

export interface Resource {
  id: string;
  title: string;
  description: string;
  categories: ResourceCategory[];
  type: ResourceType;
  href?: string;
  download?: boolean;
  /** Mark true when file/link still needs to be supplied */
  todo?: boolean;
}

export interface NavItem {
  href: string;
  label: string;
}
