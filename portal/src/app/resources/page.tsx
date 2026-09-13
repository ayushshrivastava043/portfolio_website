"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { resources } from "@/data/resources";
import type { ResourceCategory, ResourceType } from "@/data/types";

const categories: Array<ResourceCategory | "All"> = [
  "All",
  "AI",
  "Consulting",
  "Technical",
];

const types: Array<ResourceType | "All"> = [
  "All",
  "PDF",
  "Excel",
  "Word",
  "GitHub",
  "PPT",
];

const typeIcon: Record<ResourceType, string> = {
  PDF: "PDF",
  Excel: "XLS",
  Word: "DOC",
  GitHub: "GH",
  PPT: "PPT",
};

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "All">("All");
  const [type, setType] = useState<ResourceType | "All">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return resources.filter((r) => {
      const matchesQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      const matchesCat =
        category === "All" || r.categories.includes(category);
      const matchesType = type === "All" || r.type === type;
      return matchesQ && matchesCat && matchesType;
    });
  }, [query, category, type]);

  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Resources
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Models, decks, appendices, and repos. Cards marked &quot;Needs
          file&quot; await real uploads.
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources…"
          className="mt-8 w-full max-w-md rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-900"
          aria-label="Search resources"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <FilterChip
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </FilterChip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {types.map((t) => (
            <FilterChip
              key={t}
              active={type === t}
              onClick={() => setType(t)}
            >
              {t}
            </FilterChip>
          ))}
        </div>
      </FadeIn>

      <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <StaggerItem key={r.id}>
            <Card hover={false} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-zinc-100 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {typeIcon[r.type]}
                </span>
                {r.todo && (
                  <span className="rounded-sm bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                    Needs file
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-heading text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {r.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {r.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.categories.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
                <Tag>{r.type}</Tag>
              </div>
              <div className="mt-5">
                {r.href && !r.todo ? (
                  <Button
                    href={r.href}
                    size="sm"
                    variant="secondary"
                  >
                    {r.download ? "Download" : "Open"}
                  </Button>
                ) : (
                  <p className="text-xs text-zinc-400">
                    {/* TODO: Supply href in data/resources.ts */}
                    File or link not uploaded yet
                  </p>
                )}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-zinc-500">No resources match.</p>
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-accent text-white dark:bg-accent-dark"
          : "border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
      }`}
    >
      {children}
    </button>
  );
}
