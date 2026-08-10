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
      question: "Do I need technical expertise to use the platform?",
      answer: "No. Our intuitive visual builder allows anyone to create complex automation flows. Advanced users can drop into developer mode to write custom scripts and webhooks.",
    },
    {
      question: "How secure is my data?",
      answer: "Enterprise-grade security is built-in. We use end-to-end encryption, strict access controls, and we never store your raw processing data permanently. Your information remains entirely under your sovereignty.",
    },
    {
      question: "How does billing work for automation runs?",
      answer: "A run is counted each time a workflow is successfully triggered and completed. Internal logic loops, conditional branches, and retries within a single workflow execution do not count as extra runs.",
    },
    {
      question: "Can I connect custom internal tools?",
      answer: "Yes! Our platform supports custom webhooks and standard REST API integrations, allowing you to seamlessly connect proprietary databases, legacy software, and bespoke internal systems.",
    },
  ],
}: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-background py-24 font-sans">
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
                  className="flex w-full items-center justify-between p-6 text-left font-semibold text-zinc-900 hover:text-[#F59E0B] dark:text-zinc-50 dark:hover:text-[#F59E0B]"
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
