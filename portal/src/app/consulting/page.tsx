"use client";

import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { consulting } from "@/data/consulting";

export default function ConsultingPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Consulting
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Durham MBA client-facing engagements — Salud.ai, BP board strategy,
          V-Lab advisory.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-10 grid gap-4">
        {consulting.map((c) => (
          <StaggerItem key={c.slug}>
            <Card href={`/consulting/${c.slug}/`}>
              <p className="text-sm font-medium text-accent dark:text-accent-dark">
                {c.organization}
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {c.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {c.summary}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
