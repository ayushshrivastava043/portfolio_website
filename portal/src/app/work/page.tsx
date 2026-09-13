"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { work } from "@/data/work";

export default function WorkPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(work.flatMap((w) => w.tags))).sort(),
    []
  );

  const filtered = work.filter((w) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      w.title.toLowerCase().includes(q) ||
      w.organization.toLowerCase().includes(q) ||
      w.summary.toLowerCase().includes(q);
    const matchesTag = !tag || w.tags.includes(tag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Work
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Professional experience — filter and open a case study for Problem →
          Approach → Role → Outcome.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by company or keyword…"
            className="w-full max-w-md rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-900"
            aria-label="Filter work"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            className={`rounded-sm px-2.5 py-1 text-xs font-medium ${
              !tag
                ? "bg-accent text-white"
                : "border border-zinc-200 text-zinc-600 dark:border-zinc-700"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t === tag ? null : t)}
              className={`rounded-sm px-2.5 py-1 text-xs font-medium ${
                tag === t
                  ? "bg-accent text-white"
                  : "border border-zinc-200 text-zinc-600 dark:border-zinc-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </FadeIn>

      <StaggerChildren className="mt-10 grid gap-4">
        {filtered.map((w) => (
          <StaggerItem key={w.slug}>
            <Card href={`/work/${w.slug}/`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-accent dark:text-accent-dark">
                    {w.organization}
                  </p>
                  <h2 className="mt-1 font-heading text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {w.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">{w.role}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {w.tags.slice(0, 3).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {w.summary}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
