"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { FadeIn } from "@/components/motion/FadeIn";

function AskContent() {
  const params = useSearchParams();
  const q = params.get("q") ?? undefined;

  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Ask AI
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Full-page assistant backed by the same Flask + FAISS knowledge base as
          the floating widget. Cold starts on Render may take a few seconds.
        </p>
      </FadeIn>
      <div className="mt-8">
        <ChatInterface initialPrompt={q} />
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-content px-4 py-16 text-sm text-zinc-500">
          Loading chat…
        </div>
      }
    >
      <AskContent />
    </Suspense>
  );
}
