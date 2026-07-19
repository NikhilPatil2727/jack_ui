import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ArrowUpRight, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import XIcon from "@/components/icons/x-icon";
import { siteConfig } from "@/config/site";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.01c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.98 10.98 0 0 1 12 6.19c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.02c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex min-w-0 items-center gap-2">
          <Image
            src="/JackUi.png"
            alt="Jack UI logo"
            width={60}
            height={60}
            className="size-10 rounded-md object-cover"
            priority
            unoptimized
          />
          <span className="truncate text-lg font-bold tracking-tight text-black dark:text-white">
            JackUI
          </span>
        </div>
      ),
    },
    links: [
      {
        type: "main",
        text: "Pricing",
        url: "/pricing",
        active: "url",
      },
      {
        type: "custom",
        secondary: false,
        children: (
          <Link
            href="#"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-fuchsia-300 bg-white px-3 text-sm font-semibold text-fuchsia-600 shadow-[0_0_0_3px_rgba(240,171,252,0.22)] transition-colors hover:bg-fuchsia-50 dark:border-fuchsia-500/60 dark:bg-zinc-950 dark:text-fuchsia-300 dark:hover:bg-fuchsia-950/40"
          >
            <Rocket className="size-4" />
            <span className="hidden whitespace-nowrap sm:inline">
              Built app fast
            </span>
          </Link>
        ),
      },
      {
        type: "button",
        text: (
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            JackUI Boilerplate
            <ArrowUpRight className="size-3.5" />
          </span>
        ),
        url: "#",
        external: true,
      },
      {
        type: "icon",
        text: "GitHub",
        label: "GitHub",
        icon: <GitHubIcon className="size-4" />,
        url: siteConfig.links.github,
        external: true,
      },
      {
        type: "icon",
        text: "X",
        label: "X",
        icon: <XIcon className="size-3.5" />,
        url: siteConfig.links.twitter,
        external: true,
      },
    ],
    themeSwitch: {
      enabled: true,
    },
  };
}
