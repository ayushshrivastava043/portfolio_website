"use client";

import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Hands-on AI builds — RAG, LangGraph, AgentCore, Agentforce, and content
          pipelines. Built for depth, not demos.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <StaggerItem key={p.slug}>
            <Card hover>
              <div className="flex h-full flex-col">
                <h2 className="font-heading text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.githubUrl ? (
                    <Button
                      href={p.githubUrl}
                      variant="secondary"
                      size="sm"
                      className="!inline-flex"
                    >
                      GitHub
                    </Button>
                  ) : (
                    <span className="text-xs text-zinc-400">
                      {/* TODO: Add public GitHub URL in data/projects.ts */}
                      Repo link pending
                    </span>
                  )}
                  {p.askPrompt && (
                    <Button
                      href={`/ask/?q=${encodeURIComponent(p.askPrompt)}`}
                      size="sm"
                      variant="ghost"
                    >
                      Ask AI
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
