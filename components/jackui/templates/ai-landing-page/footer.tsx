"use client";

import React from "react";
import { Mail } from "lucide-react";

export interface FooterProps {
  logoText?: string;
  copyrightText?: string;
  contactEmail?: string;
}

export function Footer({
  logoText = "Aether AI",
  copyrightText = "© 2026 Aether AI Inc. All rights reserved.",
  contactEmail = "hello@aether.ai",
}: FooterProps) {
  return (
    <footer className="relative w-full bg-[#F7F8FA] text-zinc-900 overflow-hidden font-sans border-t border-zinc-200/60 rounded-b-[1.5rem] sm:rounded-b-[2rem]">
      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20 lg:pt-24 lg:px-12">
        {/* Top Grid: Brand Area + Link Columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand & Tagline Area */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-instrument italic font-normal text-2xl tracking-normal text-zinc-900">
                  {logoText}
                </span>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                Get motion captions and AI automation workflows by default in seconds. Transform your ideas into reality.
              </p>
            </div>

            {/* Social Icons & Email */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="text-sm font-medium text-zinc-800 hover:text-zinc-900 transition-colors block"
              >
                {contactEmail}
              </a>

              <div className="flex items-center gap-4 pt-3 text-zinc-500">
                {/* X / Twitter Icon */}
                <a
                  href="#"
                  aria-label="X (Twitter)"
                  className="hover:text-zinc-900 transition-colors p-1 -ml-1"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* GitHub Icon */}
                <a
                  href="#"
                  aria-label="GitHub"
                  className="hover:text-zinc-900 transition-colors p-1"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                {/* LinkedIn Icon */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:text-zinc-900 transition-colors p-1"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                {/* YouTube Icon */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="hover:text-zinc-900 transition-colors p-1"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Nav Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Product */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Product</h3>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="#features" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Caption Generator
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Subtitle Generator
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Templates
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Solutions</h3>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Automations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    AI Workflows
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    API Access
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Resources</h3>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Company</h3>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-900 transition-colors duration-200 block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="mt-16 sm:mt-20 border-t border-zinc-200/80" />

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 text-xs text-zinc-500 font-normal">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-900 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-900 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-zinc-900 transition-colors duration-200">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>

      {/* Large Decorative Oversized Bottom Typography */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none text-center pt-4 sm:pt-6">
        <span className="inline-block font-instrument italic font-bold tracking-tighter text-[clamp(5rem,16vw,20rem)] text-zinc-300/40 whitespace-nowrap leading-none transform translate-y-[28%]">
          {logoText}
        </span>
      </div>
    </footer>
  );
}
