"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
}

/**
 * 🔢 COUNT UP COMPONENT
 * Triggers a fluid, cubic-eased numerical animation when scrolled into view.
 */
export default function CountUp({ end, suffix = "", duration = 2500 }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            setCount(0);
            const startTime = performance.now();

            const animate = (now: number) => {
              try {
                const progress = Math.min((now - startTime) / duration, 1);
                // Cubic ease-out
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * end));

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              } catch {
                setCount(end);
              }
            };
            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => observer.disconnect();
    } catch {
      Promise.resolve().then(() => setCount(end));
    }
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
