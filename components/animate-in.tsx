"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "in" | "left" | "right";

export function AnimateIn({
  children,
  variant = "up",
  delay = 0,
  className = "",
  threshold = 0.12,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      className={className}
      data-animate={variant}
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
