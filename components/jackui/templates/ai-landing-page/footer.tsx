"use client";

import React from "react";
import { Cpu } from "lucide-react";

export interface FooterProps {
  logoText?: string;
  copyrightText?: string;
}

export function Footer({
  logoText = "Aether AI",
  copyrightText = "© 2026 Aether AI Inc. All rights reserved.",
}: FooterProps) {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Integrations", href: "#" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Status Page", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Logo & Intro */}
          <div className="col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-2 font-sans font-bold text-xl tracking-tight text-zinc-950 dark:text-zinc-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-sm">
                <Cpu className="h-5 w-5" />
              </div>
              <span>{logoText}</span>
            </a>
            <p className="text-sm text-zinc-500 max-w-xs dark:text-zinc-400">
              Deploy autonomous AI agents that run secure background workflows and scale operations without code.
            </p>
            <div className="flex gap-4 text-zinc-400">
              <a href="#" aria-label="Twitter" className="hover:text-zinc-600 dark:hover:text-zinc-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="Github" className="hover:text-zinc-600 dark:hover:text-zinc-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-zinc-600 dark:hover:text-zinc-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer bar */}
        <div className="mt-12 border-t border-zinc-100 pt-8 flex flex-col md:flex-row md:items-center md:justify-between dark:border-zinc-800">
          <p className="text-xs text-zinc-400">
            {copyrightText}
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
