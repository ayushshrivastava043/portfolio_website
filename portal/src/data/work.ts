import type { CaseStudy } from "./types";

export const work: CaseStudy[] = [
  {
    slug: "verifast",
    title: "Agentic AI sales platform",
    organization: "Verifast",
    role: "Agentic AI Product",
    period: "Recent",
    tags: ["AI", "Agentic", "E-commerce", "Production"],
    summary:
      "Agentic AI sales assistant serving 600+ e-commerce clients — intent detection, orchestration, semantic retrieval, and guardrails in production.",
    problem:
      "E-commerce merchants needed a sales assistant that could answer accurately from live catalogue data under high traffic — including flash sales — without hallucinating prices or stock.",
    approach: [
      "Platform architecture: intent detection → orchestration (tool/action calling) → semantic retrieval → business rules/guardrails",
      "Automated pre-go-live evaluation sets to catch data-quality issues before client launch",
      "Sandbox testing and edge-case breaking before any wide release",
      "Narrow rollout to 1–2 clients, then expand once grounded behaviour was stable",
    ],
    myRole:
      "Owned the agentic product architecture and release discipline: evaluation harnesses, grounding pipeline alignment, and production incident response.",
    outcome:
      "Platform scaled to 600+ e-commerce clients. During a flash-sale incident where stale grounding returned wrong price/stock, diagnosed batch-sync vs real-time mismatch and shipped immediate mitigation plus a long-term alignment fix.",
    learnings:
      "Grounding freshness is a product requirement, not just an infra detail. Narrow rollouts and pre-go-live eval sets catch what demos miss.",
    askPrompt: "Tell me about Ayush's work at Verifast — the agentic platform and the flash-sale grounding incident.",
  },
  {
    slug: "cgi-bell-canada",
    title: "GenAI pilot & telecom delivery",
    organization: "CGI Inc. — Bell Canada",
    role: "Business System Analyst → Associate Product Manager",
    tags: ["GenAI", "Telecom", "Agile", "Product"],
    summary:
      "Moved from BSA to Associate PM on a GenAI pilot — structured use cases, success criteria, and delivered customer enquiry automation in ~4 months.",
    problem:
      "Stakeholder ideas for GenAI were scattered; the team needed prioritised use cases with clear success criteria, plus a shift from waterfall habits mid-delivery.",
    approach: [
      "BSA foundation: workflow documentation, system design, process mapping",
      "Structured GenAI use cases with explicit success criteria",
      "Drove customer enquiry automation as the pilot delivery focus",
      "Used a real mid-cycle requirement-change example to coach waterfall → agile (not abstract training)",
    ],
    myRole:
      "Business System Analyst then Associate Product Manager on the GenAI platform pilot — use-case structuring, stakeholder alignment, and delivery cadence.",
    outcome:
      "Delivered customer enquiry automation in roughly four months. Helped the team adopt agile practices while remaining transparent about limits during a broader restructuring.",
    learnings:
      "Concrete delivery pain beats slide-deck agile training. Clear success criteria turn GenAI enthusiasm into shippable scope.",
    askPrompt: "What did Ayush do at CGI on the Bell Canada GenAI pilot?",
  },
  {
    slug: "dkpr-elearn",
    title: "E-learning platform",
    organization: "DKPR E-Learn",
    role: "Early-career role",
    period: "Early career",
    tags: ["EdTech", "E-learning"],
    summary:
      "Early-career e-learning role. Specific contributions are pending a content update.",
    problem:
      // TODO: Replace with real problem statement from Ayush
      "TODO: Supply the business/context problem for DKPR E-Learn.",
    approach: [
      // TODO: Replace with real approach bullets
      "TODO: Add approach / contributions once confirmed.",
    ],
    myRole: "TODO: Confirm exact title and responsibilities.",
    outcome: "TODO: Add measurable or qualitative outcomes.",
    learnings: "TODO: Optional learnings once content is confirmed.",
    askPrompt: "What is known so far about Ayush's DKPR E-Learn role?",
  },
];

export function getWorkBySlug(slug: string): CaseStudy | undefined {
  return work.find((w) => w.slug === slug);
}

export function getAllWorkSlugs(): string[] {
  return work.map((w) => w.slug);
}
