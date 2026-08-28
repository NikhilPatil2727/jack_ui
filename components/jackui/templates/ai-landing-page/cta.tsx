"use client";

import React from "react";

export interface CtaProps {
  title?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function CTA(props: CtaProps) {
  // CTA is now merged into the Footer component for the unified SphereAI design.
  return null;
}
