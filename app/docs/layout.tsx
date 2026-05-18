import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";
import { DocsThemeSwitch } from "@/components/nav/docs-theme-switch";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsThemeSwitch className="fixed right-4 top-4 z-50 hidden md:inline-flex" />
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
