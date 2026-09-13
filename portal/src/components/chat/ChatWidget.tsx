"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

/** Persistent floating entry to full Ask AI page — sitewide except on /ask */
export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/ask")) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[100] flex flex-col items-start gap-2">
      {open && (
        <div className="mb-1 w-64 rounded-lg border border-zinc-200 bg-white p-4 shadow-lift dark:border-zinc-700 dark:bg-surface-dark-elevated">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Ask about Verifast, CGI, MBA consulting, or projects.
          </p>
          <Link
            href="/ask/"
            className="mt-3 inline-flex text-sm font-medium text-accent hover:underline dark:text-accent-dark"
            onClick={() => setOpen(false)}
          >
            Open Ask AI →
          </Link>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="relative h-14 w-14 overflow-hidden rounded-full border border-zinc-200 bg-white shadow-lift transition-transform duration-hover hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <Image
          src="/images/chatbot-avatar-optimized.webp"
          alt=""
          width={56}
          height={56}
          className="object-cover"
        />
      </button>
    </div>
  );
}
