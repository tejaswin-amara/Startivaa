"use client";
import AnimatedSection from "@/components/AnimatedSection";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const EarthGlobe = dynamic(() => import("@/components/EarthGlobe"), {
  ssr: false,
  loading: () => <div className="w-full aspect-square rounded-full border border-violet-primary/20 bg-violet-primary/5 animate-pulse" />
});

const featuredPlatforms = ["NASA Space Apps", "GITEX Asia 2026", "Global AI Show"];

interface Props {
  servicePillars: Array<{ icon: React.ReactNode; title: string }>;
}

/**
 * 🚀 HERO SECTION COMPONENT
 * The high-impact primary landing screen, optimized for Next.js Server Components.
 */
export default function Hero({ servicePillars }: Props) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Dynamic ambient backglow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_72%_38%,rgba(124,58,237,0.13)_0%,transparent_55%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Core Pitch */}
          <AnimatedSection className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 tracking-widest bg-violet-primary/10 border border-violet-primary/25 text-violet-400">
              <Sparkles size={12} className="animate-pulse" />
              STARTUP GROWTH • MENTORSHIP • INNOVATION
            </div>
            
            <h1 className="font-bold leading-[1.05] mb-6 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
              We Build<br />
              <span className="text-white">Startups.</span><br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                We Build Futures.
              </span>
            </h1>
            
            <p className="text-lg leading-relaxed mb-8 max-w-lg text-text-muted">
              From idea to growth and beyond — helping founders, startups, and institutions build scalable businesses through mentorship, innovation, and strategic execution.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#enquiry"
                className="w-full sm:w-auto text-center text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 bg-gradient-to-r from-rose-600 to-pink-500 shadow-[0_0_32px_rgba(225,29,72,0.35),0_4px_20px_rgba(225,29,72,0.2)] border border-white/15"
              >
                BOOK FREE DISCOVERY CALL
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto text-center font-semibold px-8 py-4 rounded-full border border-white/15 text-white transition-all duration-300 hover:border-violet-primary hover:text-violet-400 bg-white/3 hover:bg-white/6"
              >
                WHO WE ARE &rarr;
              </a>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-text-muted">Featured at:</span>
              {featuredPlatforms.map((name) => (
                <span
                  key={name}
                  className="text-xs px-3 py-1 rounded-full bg-white/4 border border-white/8 text-text-muted font-medium hover:border-white/15 transition-all duration-200"
                >
                  {name}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Column - SVG Globe */}
          <AnimatedSection delay={0.2} className="hidden lg:flex items-center justify-center relative">
            <div className="w-full max-w-[560px] aspect-square flex items-center justify-center">
              <EarthGlobe />
            </div>
          </AnimatedSection>

        </div>
      </div>

      {/* Service Pillars Bottom Floating Bar — High-Fidelity Infinite Marquee Carousel */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#07070A]/50 backdrop-blur-md z-20 py-4 overflow-hidden">
        {/* Elegant left and right fading vignetting to frame the carousel */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#07070A] via-[#07070A]/70 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#07070A] via-[#07070A]/70 to-transparent z-30 pointer-events-none" />

        <div className="flex w-max">
          <motion.div
            className="flex items-center gap-12 px-6"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity,
            }}
          >
            {/* Duplicated pillar array to ensure seamless infinite looping */}
            {[...servicePillars, ...servicePillars].map((s, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wide text-text-muted hover:text-white transition-colors duration-200 whitespace-nowrap cursor-default group"
              >
                <span className="text-violet-primary scale-100 group-hover:scale-110 transition-transform duration-200">{s.icon}</span>
                <span>{s.title}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
