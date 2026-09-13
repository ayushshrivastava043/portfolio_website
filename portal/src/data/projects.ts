import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "neo",
    title: "Neo — Personal RAG Assistant",
    summary: "Flask + FAISS multi-tenant RAG with Gemini/OpenAI fallback.",
    description:
      "Built chapter-by-chapter for deep understanding — not demo scaffolding. Multi-tenant RAG assistant with Gemini/OpenAI fallback. This portfolio chatbot uses the same KB-first pattern.",
    tags: ["AI", "RAG", "Technical"],
    tech: ["Flask", "FAISS", "RAG", "Gemini", "OpenAI"],
    // TODO: Add public GitHub URL if available
    githubUrl: undefined,
    askPrompt: "What is Neo, Ayush's personal RAG assistant?",
  },
  {
    slug: "finbot",
    title: "Finbot — Investment Chatbot",
    summary: "Investment advice chatbot built on BharatGPT.",
    description:
      "Built on BharatGPT with a sequential, component-by-component approach to understand each layer of the stack.",
    tags: ["AI", "FinTech", "Technical"],
    tech: ["BharatGPT", "Python"],
    githubUrl: undefined,
    askPrompt: "Tell me about Finbot, Ayush's investment chatbot.",
  },
  {
    slug: "aws-bedrock-agentcore",
    title: "AWS Bedrock AgentCore + LangGraph",
    summary: "Full LangGraph agent deployment on AWS Bedrock AgentCore.",
    description:
      "Hands-on agent deployment for interview readiness and deep learning of orchestration patterns — LangGraph on AWS Bedrock AgentCore.",
    tags: ["AI", "AWS", "Agentic"],
    tech: ["AWS Bedrock AgentCore", "LangGraph"],
    githubUrl: undefined,
    askPrompt: "What did Ayush build with AWS Bedrock AgentCore and LangGraph?",
  },
  {
    slug: "salesforce-agentforce",
    title: "Salesforce Agentforce & Data Cloud",
    summary: "Trailhead study mapped to Verifast agentic architecture.",
    description:
      "Self-study via Trailhead for Success Architect interview prep — Topics/Actions, DMOs, identity resolution — explicitly mapped back to Verifast agentic product experience.",
    tags: ["Salesforce", "Agentic", "Technical"],
    tech: ["Agentforce", "Data Cloud", "Trailhead"],
    askPrompt: "How does Ayush's Salesforce Agentforce study connect to Verifast?",
  },
  {
    slug: "ai-video-pipeline",
    title: "AI Video Content Pipeline",
    summary: "Script → image → video → edit pipeline for culture & comedy content.",
    description:
      "ChatGPT scripts, Minimax/Imagine video, Midjourney images, Shotcut editing. Content themes: Indian history/culture and youth comedy/lifestyle.",
    tags: ["AI", "Content", "Creative"],
    tech: ["ChatGPT", "Midjourney", "Minimax", "Shotcut"],
    askPrompt: "Describe Ayush's AI video content pipeline.",
  },
  {
    slug: "myagentcore",
    title: "MyAgentcore",
    summary: "Custom agent framework for building and deploying AI agents.",
    description:
      "Custom agent framework focused on building and deploying AI agents with reusable orchestration patterns.",
    tags: ["AI", "Agentic", "Technical"],
    tech: ["Python", "Agentic AI"],
    // TODO: Confirm public repo URL
    githubUrl: undefined,
    askPrompt: "What is MyAgentcore?",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
