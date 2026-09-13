import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-600",
        "dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300",
        className
      )}
    >
      {children}
    </span>
  );
}
