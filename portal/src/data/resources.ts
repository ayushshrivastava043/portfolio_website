import type { Resource } from "./types";

/**
 * Resources hub data.
 * Do not invent files — entries marked `todo: true` need real links/files from Ayush.
 */
export const resources: Resource[] = [
  {
    id: "bp-excel-models",
    title: "BP Board Strategy — Excel financial models",
    description: "Financial models supporting asset divestment and IEMS analysis.",
    categories: ["Consulting"],
    type: "Excel",
    // TODO: Add real file path under /public/resources/ or external URL
    href: undefined,
    download: true,
    todo: true,
  },
  {
    id: "bp-word-appendices",
    title: "BP Board Strategy — Word appendices",
    description: "Supporting appendices for the board strategy pack.",
    categories: ["Consulting"],
    type: "Word",
    href: undefined,
    download: true,
    todo: true,
  },
  {
    id: "bp-deck",
    title: "BP Board Strategy — Presentation deck",
    description: "Boardroom PowerPoint for the BP strategy case.",
    categories: ["Consulting"],
    type: "PPT",
    href: undefined,
    download: true,
    todo: true,
  },
  {
    id: "vlab-australia-model",
    title: "V-Lab — Australia market Excel model",
    description: "TAM/SAM/SOM and market-entry model for Australia wind VR training.",
    categories: ["Consulting", "AI"],
    type: "Excel",
    href: undefined,
    download: true,
    todo: true,
  },
  {
    id: "vlab-market-reports",
    title: "V-Lab — Multi-country market reports",
    description: "India / China / Australia wind energy VR market entry reports.",
    categories: ["Consulting"],
    type: "PDF",
    href: undefined,
    download: true,
    todo: true,
  },
  {
    id: "salud-presentation",
    title: "Salud.ai — Client presentation",
    description: "15-minute consultancy sprint presentation with script.",
    categories: ["Consulting", "AI"],
    type: "PPT",
    href: undefined,
    download: true,
    todo: true,
  },
  {
    id: "resume-pdf",
    title: "Resume (PDF)",
    description: "Latest CV for Applied AI / GenAI Product roles.",
    categories: ["Technical"],
    type: "PDF",
    // Existing asset from legacy site — confirm path after copy
    href: "/resume.pdf",
    download: true,
    todo: true, // TODO: Place actual resume at public/resume.pdf
  },
  {
    id: "github-profile",
    title: "GitHub profile",
    description: "Public repositories and experiments.",
    categories: ["Technical", "AI"],
    type: "GitHub",
    href: "https://github.com/ayushshrivastava1292",
    download: false,
  },
  {
    id: "neo-repo",
    title: "Neo RAG Assistant — source",
    description: "Flask + FAISS personal RAG assistant codebase.",
    categories: ["AI", "Technical"],
    type: "GitHub",
    // TODO: Supply public repo URL
    href: undefined,
    todo: true,
  },
  {
    id: "myagentcore-repo",
    title: "MyAgentcore — source",
    description: "Custom agent framework for deploying AI agents.",
    categories: ["AI", "Technical"],
    type: "GitHub",
    href: undefined,
    todo: true,
  },
];
