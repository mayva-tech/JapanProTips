import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ItineraryTemplatePage } from "@/components/itinerary/templates/ItineraryTemplatePage";
import {
  CURATED_ITINERARY_TEMPLATE_SLUGS,
  getCuratedItineraryTemplateBySlug,
} from "@/lib/itinerary/curated-itinerary-templates";
import { pageTitle, siteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CURATED_ITINERARY_TEMPLATE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getCuratedItineraryTemplateBySlug(slug);
  if (!template) {
    return { title: pageTitle("Itinerary template not found") };
  }

  const canonical = `${siteUrl()}/itinerary-templates/${slug}`;

  return {
    title: pageTitle(template.title),
    description: template.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: template.title,
      description: template.description,
      locale: "en_US",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CuratedItineraryTemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getCuratedItineraryTemplateBySlug(slug);
  if (!template) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream font-sans">
      <div className="border-b border-paper-edge bg-paper/90">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <nav
            className="font-sans text-sm font-semibold text-muted"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-rust hover:text-maroon">
              Home
            </Link>
            <span aria-hidden className="mx-2 text-tan">
              /
            </span>
            <Link
              href="/itinerary-templates"
              className="text-rust hover:text-maroon"
            >
              Itinerary templates
            </Link>
            <span aria-hidden className="mx-2 text-tan">
              /
            </span>
            <span className="text-dark">{template.title}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <ItineraryTemplatePage template={template} />
        </div>
      </article>
    </main>
  );
}
