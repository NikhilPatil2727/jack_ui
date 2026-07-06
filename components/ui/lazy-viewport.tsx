"use client";

import React, { useEffect, useRef, useState } from "react";

interface LazyViewportProps {
  children: React.ReactNode | (() => React.ReactNode);
  placeholder?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazyViewport({
  children,
  placeholder,
  threshold = 0.05,
  rootMargin = "100px 0px 100px 0px",
}: LazyViewportProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, just render children immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[inherit] flex flex-col justify-center items-center">
      {isInView
        ? typeof children === "function"
          ? (children as () => React.ReactNode)()
          : children
        : placeholder}
    </div>
  );
}
