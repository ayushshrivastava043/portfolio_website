import type { NavItem } from "./types";

export const site = {
  name: "Ayush Shrivastava",
  title: "AI Product Manager — Applied AI / GenAI Product",
  tagline:
    "Agentic systems that ship in production. ~9 years across engineering, analysis, and AI product. Durham MBA.",
  email: "ayush.shrivastava.1292@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayushshrivastava1292",
  github: "https://github.com/ayushshrivastava1292",
  youtube: "https://www.youtube.com/@Virtualr_eality",
  whatsapp: "https://wa.me/918770087774",
  location: "Durham, UK",
  mba: "Full-Time MBA, Durham University Business School — Consulting, Strategy & AI (expected Sep 2026)",
  highlights: [
    {
      title: "Verifast",
      body: "Agentic AI sales platform for 600+ e-commerce clients.",
      href: "/work/verifast/",
    },
    {
      title: "CGI / Bell Canada",
      body: "GenAI pilot — customer enquiry automation in ~4 months.",
      href: "/work/cgi-bell-canada/",
    },
    {
      title: "Durham MBA consulting",
      body: "Salud.ai, BP board strategy, V-Lab market entry.",
      href: "/consulting/",
    },
    {
      title: "Hands-on agentic builds",
      body: "Neo RAG, LangGraph, Bedrock AgentCore, Agentforce.",
      href: "/projects/",
    },
  ],
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Work" },
  { href: "/consulting/", label: "Consulting" },
  { href: "/projects/", label: "Projects" },
  { href: "/resources/", label: "Resources" },
  { href: "/ask/", label: "Ask AI" },
  { href: "/contact/", label: "Contact" },
];

/** Flask chatbot on Render — kept separate; Next.js only calls it */
export const chatbotApiUrl =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL ??
  "https://portfolio-chatbot-api-slev.onrender.com/chat";
