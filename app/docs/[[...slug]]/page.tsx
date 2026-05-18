import { source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
// import { getMDXComponents } from '@/components/mdx';
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import type { Metadata } from 'next';
import { Preview } from "@/components/mdx/preview";
import { PreviewClient } from "@/components/mdx/preview-client";
import { cn } from "@/lib/utils";
import type { ComponentProps, ComponentType } from "react";

type DocsPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

type MdxPageData = {
  body: ComponentType<{ components?: unknown }>;
  toc?: ComponentProps<typeof DocsPage>["toc"];
  full?: ComponentProps<typeof DocsPage>["full"];
};

export default async function Page(props: DocsPageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const pageData = page.data as typeof page.data & MdxPageData;
  const MDX = pageData.body;

  return (
    <DocsPage
      toc={pageData.toc}
      full={pageData.full}
      className={cn(
        pageData.full &&
          "max-w-[min(100%,72rem)] px-4 sm:px-6 lg:px-8 xl:max-w-[72rem]",
      )}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{...defaultMdxComponents, Tab, Tabs, Preview, PreviewClient}}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: DocsPageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
