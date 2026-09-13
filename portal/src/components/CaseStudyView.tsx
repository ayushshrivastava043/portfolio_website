import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import type { CaseStudy } from "@/data/types";

interface CaseStudyViewProps {
  study: CaseStudy;
  backHref: string;
  backLabel: string;
}

export function CaseStudyView({ study, backHref, backLabel }: CaseStudyViewProps) {
  return (
    <article className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <Link
          href={backHref}
          className="text-sm font-medium text-zinc-500 hover:text-accent"
        >
          ← {backLabel}
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <p className="mt-4 text-sm font-medium text-accent dark:text-accent-dark">
          {study.organization}
          {study.period ? ` · ${study.period}` : ""}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          {study.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">{study.role}</p>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {study.summary}
        </p>

        {study.askPrompt && (
          <div className="mt-8">
            <Button href={`/ask/?q=${encodeURIComponent(study.askPrompt)}`}>
              Ask AI about this project
            </Button>
          </div>
        )}
      </FadeIn>

      <div className="mt-14 space-y-12">
        <Section title="Problem">
          <p>{study.problem}</p>
        </Section>

        <Section title="Approach">
          <ul className="list-disc space-y-2 pl-5">
            {study.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="My role">
          <p>{study.myRole}</p>
        </Section>

        <Section title="Outcome">
          <p>{study.outcome}</p>
        </Section>

        {study.learnings && (
          <Section title="Learnings">
            <p>{study.learnings}</p>
          </Section>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeIn>
      <h2 className="font-heading text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </FadeIn>
  );
}
