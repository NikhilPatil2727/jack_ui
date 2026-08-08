"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
}

export function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about setting up and running autonomous workflows.",
  faqs = [
    {
      question: "Do I need a custom API key for OpenAI or Anthropic?",
      answer: "No. By default, Aether operates on premium, pre-configured instances of global models. However, you can toggle Developer Mode to insert your own custom keys and pay raw inference rates directly.",
    },
    {
      question: "How secure is my connected database?",
      answer: "Extremely secure. All connections use read-only SSL tunnels, with automated token rotating. We never cache or store raw table records on our cloud coordinators; data remains entirely under your sovereignty.",
    },
    {
      question: "What is an 'execution session' exactly?",
      answer: "An execution session is defined as one agent pipeline run from ingestion to finalized action (e.g. running a query, parsing results, formatting reports, and delivering to Slack). Single tasks running multiple nested logic loops only count as a single session.",
    },
    {
      question: "Can I self-host Aether locally?",
      answer: "Yes! Enterprise customers gain access to our custom local docker builds, allowing full agent compilation inside private air-gapped VPC systems.",
    },
  ],
}: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-6 text-left font-semibold text-zinc-900 hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-zinc-100 p-6 text-sm text-zinc-600 leading-relaxed dark:border-zinc-800 dark:text-zinc-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
