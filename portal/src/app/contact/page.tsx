import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Email, LinkedIn, GitHub, YouTube, WhatsApp, and resume.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16">
      <FadeIn>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Contact
        </h1>
        <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
          Based in {site.location}. Open to Applied AI / GenAI Product and
          consulting-strategy conversations.
        </p>

        <dl className="mt-10 space-y-6 text-sm">
          <div>
            <dt className="font-medium text-zinc-500">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${site.email}`}
                className="text-accent hover:underline dark:text-accent-dark"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-zinc-500">Education</dt>
            <dd className="mt-1 text-zinc-700 dark:text-zinc-300">{site.mba}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={site.linkedin}>LinkedIn</Button>
          <Button href={site.github} variant="secondary">
            GitHub
          </Button>
          <Button href={site.youtube} variant="secondary">
            YouTube
          </Button>
          <Button href={site.whatsapp} variant="secondary">
            WhatsApp
          </Button>
          {/* TODO: Place resume at public/resume.pdf */}
          <Button href="/resume.pdf" variant="ghost">
            Resume (PDF)
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
