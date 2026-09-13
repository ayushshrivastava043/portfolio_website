import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Single subtle hero wash — only decorative gradient on site */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.08),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%)]"
        />
        <div className="relative mx-auto max-w-content px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-widest text-accent dark:text-accent-dark">
              {site.name}
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Applied AI &amp; GenAI Product
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/work/">View work</Button>
              <Button href="/ask/" variant="secondary">
                Ask AI
              </Button>
              <Button href="/resources/" variant="ghost">
                Resources
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-content px-4 py-16 md:px-6">
          <FadeIn>
            <h2 className="font-heading text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Highlights
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Start here — each opens a deeper case study or section.
            </p>
          </FadeIn>

          <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-2">
            {site.highlights.map((h) => (
              <StaggerItem key={h.title}>
                <Card href={h.href}>
                  <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {h.body}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
