import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";
import { DocsThemeSwitch } from "@/components/nav/docs-theme-switch";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
        // footer: (
        //   <div className="hidden items-center justify-end border-t border-fd-border/70 px-2 py-3 md:flex">
        //     <DocsThemeSwitch />
        //   </div>
        // ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
