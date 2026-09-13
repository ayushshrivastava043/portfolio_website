import type { CaseStudy } from "./types";

export const consulting: CaseStudy[] = [
  {
    slug: "salud-ai",
    title: "US freemium health app sprint",
    organization: "Salud.ai",
    role: "Co-founder of consultancy sprint — AI & data strategy lead",
    period: "Durham MBA",
    tags: ["Consulting", "HealthTech", "GTM", "AI Strategy"],
    summary:
      "Durham MBA consultancy sprint for a US-market freemium health app — GTM, data/AI strategy, KPI framework, and a 15-minute client presentation.",
    problem:
      "Salud.ai needed a clear go-to-market and AI/data strategy for a US freemium health product, with KPIs and executable backlog items.",
    approach: [
      "Split work across pods: GTM (Pod A) and data/AI strategy (Pod B)",
      "Designed KPI framework and survey instruments",
      "Translated recommendations into Jira tickets",
      "Prepared a 15-minute client presentation with full script",
    ],
    myRole:
      "Led AI & data strategy; co-founded the sprint; owned presentation delivery and client-facing narrative.",
    outcome:
      "Delivered a structured consultancy pack and client presentation. When the business audience disengaged from detailed frameworks, pivoted mid-presentation to recommendations to keep stakeholders engaged.",
    learnings:
      "Audience attention is a delivery constraint — frameworks serve the recommendation, not the other way around.",
    askPrompt: "Tell me about Ayush's Salud.ai consultancy sprint at Durham MBA.",
  },
  {
    slug: "bp-board-strategy",
    title: "Board strategy case",
    organization: "BP",
    role: "MBA board strategy team member",
    period: "Durham MBA",
    tags: ["Consulting", "Strategy", "Energy", "AI Transformation"],
    summary:
      "Board-level strategy: asset divestment, IEMS for data centres, AI transformation pillars, and a Geopolitical Intelligence Unit recommendation.",
    problem:
      "Board needed integrated recommendations spanning asset portfolio, energy-for-data-centres economics, AI transformation, and geopolitical intelligence.",
    approach: [
      "Asset divestment analysis",
      "IEMS for data centres (Lightsource BP + gas + Castrol cooling)",
      "AI transformation strategy across four pillars",
      "Geopolitical Intelligence Unit recommendation",
      "Deliverables: PowerPoint, Excel financial models, Word appendices, boardroom speech notes",
    ],
    myRole:
      "Contributed analysis and board-ready artefacts across financial modelling, strategy narrative, and speech notes.",
    outcome:
      "Complete board pack: presentation, Excel models, Word appendices, and speech notes ready for boardroom delivery.",
    learnings:
      "Board audiences need decision-ready artefacts — models, appendices, and a speakable narrative as one system.",
    askPrompt: "What did Ayush do on the BP board strategy case?",
  },
  {
    slug: "v-lab",
    title: "Strategic consulting & ongoing advisory",
    organization: "V-Lab",
    role: "Strategic consultant / advisor",
    period: "Durham MBA",
    tags: ["Consulting", "Agentic AI", "Market Entry", "VR"],
    summary:
      "Agentic AI use cases, multi-country market entry for wind energy VR training, TAM/SAM/SOM models, and six service concepts on digital shadow data.",
    problem:
      "V-Lab needed agentic AI product concepts grounded in digital shadow data, plus credible market-entry sizing for India, China, and Australia in wind VR training.",
    approach: [
      "Mapped agentic AI use cases from solution architecture through market positioning",
      "Built/corrected TAM/SAM/SOM from first principles for India, China, Australia",
      "Produced multi-country reports and an Australia Excel model",
      "Defined six agentic AI service concepts on digital shadow data",
      "Created a cross-document positioning framework",
    ],
    myRole:
      "Owned market-sizing models, multi-country entry analysis, and agentic AI service concept framing.",
    outcome:
      "Market-entry reports, Excel models, six agentic service concepts, and a positioning framework used for ongoing advisory.",
    learnings:
      "TAM/SAM/SOM only helps when built from first principles — inherited numbers hide weak assumptions.",
    askPrompt: "Explain Ayush's V-Lab strategic consulting and market entry work.",
  },
];

export function getConsultingBySlug(slug: string): CaseStudy | undefined {
  return consulting.find((c) => c.slug === slug);
}

export function getAllConsultingSlugs(): string[] {
  return consulting.map((c) => c.slug);
}
