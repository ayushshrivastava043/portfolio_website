import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { getAllWorkSlugs, getWorkBySlug } from "@/data/work";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getWorkBySlug(params.slug);
  if (!study) return { title: "Not found" };
  return {
    title: `${study.title} — ${study.organization}`,
    description: study.summary,
  };
}

export default function WorkCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getWorkBySlug(params.slug);
  if (!study) notFound();

  return (
    <CaseStudyView study={study} backHref="/work/" backLabel="All work" />
  );
}
