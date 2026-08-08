"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, Zap, Globe, Database } from "lucide-react";

export interface LogoCloudProps {
  title?: string;
}

export function LogoCloud({
  title = "TRUSTED BY LEADING TEAMS AND INTEGRATES WITH YOUR SYSTEM",
}: LogoCloudProps) {
  const integrationLogos = [
    { name: "OpenAI", icon: <Cpu className="h-6 w-6 text-zinc-800 dark:text-zinc-200" /> },
    { name: "Hugging Face", icon: <Terminal className="h-6 w-6 text-zinc-800 dark:text-zinc-200" /> },
    { name: "Anthropic", icon: <Shield className="h-6 w-6 text-zinc-800 dark:text-zinc-200" /> },
    { name: "Supabase", icon: <Database className="h-6 w-6 text-zinc-800 dark:text-zinc-200" /> },
    { name: "Vercel", icon: <Zap className="h-6 w-6 text-zinc-800 dark:text-zinc-200" /> },
    { name: "Pinecone", icon: <Globe className="h-6 w-6 text-zinc-800 dark:text-zinc-200" /> },
  ];

  return (
    <div className="bg-background py-10 border-y border-zinc-200/50 dark:border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-500">
          {title}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
          {integrationLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2 grayscale transition hover:grayscale-0"
              whileHover={{ scale: 1.05 }}
            >
              {logo.icon}
              <span className="text-sm font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
