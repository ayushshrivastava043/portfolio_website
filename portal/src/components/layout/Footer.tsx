import Link from "next/link";
import { site, navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-heading text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {site.title}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Navigate
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400 dark:hover:text-accent-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Connect
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-accent dark:text-zinc-400"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-accent dark:text-zinc-400"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-zinc-600 hover:text-accent dark:text-zinc-400"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
