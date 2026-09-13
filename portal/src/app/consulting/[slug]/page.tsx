import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import {
  getAllConsultingSlugs,
  getConsultingBySlug,
} from "@/data/consulting";

export function generateStaticParams() {
  return getAllConsultingSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getConsultingBySlug(params.slug);
  if (!study) return { title: "Not found" };
  return {
    title: `${study.title} — ${study.organization}`,
    description: study.summary,
  };
}

export default function ConsultingCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getConsultingBySlug(params.slug);
  if (!study) notFound();

  return (
    <CaseStudyView
      study={study}
      backHref="/consulting/"
      backLabel="All consulting"
    />
  );
}
