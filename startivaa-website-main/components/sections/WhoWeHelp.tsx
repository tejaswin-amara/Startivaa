"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { GraduationCap, Zap, User } from "lucide-react";
import { motion } from "framer-motion";

interface TargetCard {
  icon: React.ReactNode;
  label: string;
  tagline: string;
  points: string[];
}

const targetAudience: TargetCard[] = [
  {
    icon: <GraduationCap className="w-7 h-7" />,
    label: "Institutions & Colleges",
    tagline: "Build a thriving startup culture on campus",
    points: [
      "Innovation programs & AI workshops",
      "Entrepreneurship bootcamps",
      "Startup ecosystem development",
      "Founder engagement initiatives",
      "Faculty & student mentoring",
    ],
  },
  {
    icon: <Zap className="w-7 h-7" />,
    label: "Startup Founders",
    tagline: "From idea to investor-ready, faster",
    points: [
      "Startup consulting & growth strategy",
      "Branding & execution support",
      "Funding readiness",
      "Startup visibility enhancement",
      "Go-to-market planning",
    ],
  },
  {
    icon: <User className="w-7 h-7" />,
    label: "Student Entrepreneurs",
    tagline: "Launch your first startup the right way",
    points: [
      "Founder mentoring & startup guidance",
      "Pitch preparation & launch support",
      "Ecosystem exposure",
      "Student founder communities",
      "Career & startup roadmapping",
    ],
  },
];

/**
 * 🎓 WHO WE HELP SECTION COMPONENT
 * Renders high-end cards segmenting the target groups.
 */
export default function WhoWeHelp() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Who We Help</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Built For <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Every Builder</span>
          </h2>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targetAudience.map((card, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.025, boxShadow: "0 15px 35px -10px rgba(123, 63, 242, 0.18)", borderColor: "rgba(123, 63, 242, 0.4)" }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="glass-card p-8 h-full relative overflow-hidden group border border-violet-primary/20 cursor-pointer"
              >
                
                {/* Visual indicator slider glow top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-violet-500 to-indigo-400" />
                
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 text-violet-400 border border-violet-primary/20">
                  {card.icon}
                </div>
                
                {/* Headers */}
                <h3 className="text-xl font-bold font-heading text-white mb-1">
                  {card.label}
                </h3>
                <p className="text-sm mb-5 text-violet-400 font-medium">
                  {card.tagline}
                </p>
                
                {/* Bullet Points */}
                <ul className="flex flex-col gap-3">
                  {card.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
