"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export function Card({ children, className, href, hover = true }: CardProps) {
  const classes = cn(
    "rounded-lg border border-zinc-200 bg-white p-6 shadow-rest",
    "dark:border-zinc-800 dark:bg-surface-dark-elevated",
    hover && "transition-shadow duration-hover hover:shadow-lift",
    className
  );

  const inner = hover ? (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "block h-full")}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
