"use client";

import { useEffect, useRef, useState } from "react";
import { sendChatMessage, type ChatMessage } from "@/lib/chatbot";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  initialPrompt?: string;
  compact?: boolean;
  className?: string;
}

export function ChatInterface({
  initialPrompt,
  compact = false,
  className,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey — ask about Verifast, CGI, Durham MBA consulting, or technical projects.",
    },
  ]);
  const [input, setInput] = useState(initialPrompt ?? "");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialPrompt && !sentInitial.current) {
      sentInitial.current = true;
      void handleSend(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const nextHistory: ChatMessage[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    const reply = await sendChatMessage(content, messages);
    setMessages([...nextHistory, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-surface-dark-elevated",
        compact ? "h-[420px]" : "h-[min(70vh,640px)]",
        className
      )}
    >
      <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={cn(
              "max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed",
              m.role === "user"
                ? "ml-auto bg-accent text-white dark:bg-accent-dark"
                : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            )}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <p className="text-sm text-zinc-500">Thinking…</p>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        className="flex gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSend();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about experience, projects, MBA…"
          className="flex-1 rounded-sm border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-accent dark:border-zinc-700"
          aria-label="Chat message"
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
