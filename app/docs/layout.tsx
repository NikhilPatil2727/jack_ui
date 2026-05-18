import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";
import { DocsThemeSwitch } from "@/components/nav/docs-theme-switch";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed right-4 top-4 z-50 hidden items-center gap-2 md:flex">
        <Link
          href="/pricing"
          className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          Pricing
        </Link>
        <Link
          href="#"
          target="_blank"
          className="inline-flex items-center gap-1 rounded-lg bg-fd-primary px-2.5 py-1.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
        >
          Pro
          <ArrowUpRight className="size-3.5" />
        </Link>
        <DocsThemeSwitch />
      </div>
      <DocsLayout  tree={source.pageTree}
        {...baseOptions()}
        sidebar={{
          defaultOpenLevel: 1,
          
        }}
      
      >
        {children}
      </DocsLayout>
    </>
  );
}
