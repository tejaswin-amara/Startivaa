"use client";

import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import { motion } from "framer-motion";

interface StatItem {
  end: number;
  suffix: string;
  label: string;
}

interface Props {
  stats: StatItem[];
}

/**
 * 📈 STATS SECTION COMPONENT
 * Displays metric cards with smooth count-up counters as the user scrolls.
 */
export default function Stats({ stats }: Props) {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Impact & Results</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Numbers That <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Speak</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.03, boxShadow: "0 15px 30px -10px rgba(244,63,94,0.15)", borderColor: "rgba(244,63,94,0.35)" }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="p-8 text-center group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(20,8,50,0.95)] to-[rgba(12,4,32,0.98)] border border-violet-primary/25 shadow-[0_0_30px_rgba(124,58,237,0.08),inset_0_1_0_rgba(255,255,255,0.06)] cursor-pointer"
            >
              {/* Internal hovering ambient glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.08),transparent_70%)]" />
              
              {/* Numerical value */}
              <div className="text-4xl sm:text-5xl font-bold mb-3 font-heading relative bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(244,63,94,0.35)]">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              
              {/* Label */}
              <div className="text-xs font-semibold leading-relaxed text-[#C4B5D4] uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
