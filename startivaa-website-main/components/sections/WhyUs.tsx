"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Target,
  Rocket,
  Globe,
  Network,
  Cpu,
  LineChart,
  Lightbulb,
  Volume2,
  Coins,
  Award,
  Handshake,
  School,
  Users,
} from "lucide-react";

const foundersBenefits = [
  { icon: <Target className="w-5 h-5" />, title: "Founder-First Approach", desc: "Every program is designed around real founder challenges — practical, not theoretical." },
  { icon: <Rocket className="w-5 h-5" />, title: "Practical Execution-Focused Mentoring", desc: "We build alongside you with accountability, milestones, and real outcomes." },
  { icon: <Globe className="w-5 h-5" />, title: "Startup Growth & Branding Support", desc: "From positioning to visibility — we help you build a brand that stands out." },
  { icon: <Network className="w-5 h-5" />, title: "Strong Founder & Institutional Network", desc: "Tap into a curated network of founders, mentors, and institutional partners." },
  { icon: <Cpu className="w-5 h-5" />, title: "AI & Innovation Integration", desc: "Every engagement embeds AI tools and innovation practices from day one." },
  { icon: <LineChart className="w-5 h-5" />, title: "Strategic Startup Positioning", desc: "We help you craft a compelling market position and growth narrative." },
  { icon: <Lightbulb className="w-5 h-5" />, title: "Investor-Readiness Support", desc: "From pitch decks to term sheets — we prepare you for fundraising conversations." },
  { icon: <Volume2 className="w-5 h-5" />, title: "Startup Ecosystem Exposure", desc: "Get featured on global stages, platforms, and founder networks." },
  { icon: <Coins className="w-5 h-5" />, title: "Business Execution Support", desc: "Hands-on guidance on operations, GTM, systems, and scaling decisions." },
  { icon: <Award className="w-5 h-5" />, title: "Long-Term Scaling Focus", desc: "We stay with you beyond launch — supporting growth across every stage." },
  { icon: <Handshake className="w-5 h-5" />, title: "Visibility Growth Support", desc: "Build your personal and startup brand across digital and ecosystem channels." },
];

const institutionsBenefits = [
  { icon: <School className="w-5 h-5" />, title: "Industry-Aligned Innovation Programs", desc: "Programs designed to match real industry demands and emerging tech trends." },
  { icon: <Globe className="w-5 h-5" />, title: "Startup Ecosystem Exposure", desc: "Connect students and faculty to live startup ecosystems and founder networks." },
  { icon: <Cpu className="w-5 h-5" />, title: "AI & Entrepreneurship Workshops", desc: "Practical AI and innovation sessions tailored for college audiences." },
  { icon: <Users className="w-5 h-5" />, title: "Founder Mentoring Initiatives", desc: "Student founders get direct access to mentors with real startup experience." },
  { icon: <Rocket className="w-5 h-5" />, title: "Practical Learning Experiences", desc: "Bootcamps, hackathons, and live projects that go beyond the classroom." },
  { icon: <Target className="w-5 h-5" />, title: "Innovation Culture Development", desc: "We help institutions build a lasting culture of entrepreneurship and problem-solving." },
  { icon: <Network className="w-5 h-5" />, title: "Startup Ecosystem Building Support", desc: "End-to-end support to establish or strengthen your institution's startup cell." },
  { icon: <Volume2 className="w-5 h-5" />, title: "Entrepreneurship-Driven Engagement", desc: "Keynotes, panels, and workshops that inspire and activate student entrepreneurs." },
];

/**
 * 🏛️ WHY US / BENEFIT GRID SECTION COMPONENT
 * Renders two sub-sections clearly highlighting unique values.
 */
export default function WhyUs() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">Why Startivaa</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Practical. Proven. <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Ecosystem-Driven.</span>
          </h2>
        </div>

        {/* ── FOUNDERS SUBSECTION ── */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-px flex-1 bg-violet-primary/20" />
            <span className="text-xs font-bold tracking-widest px-4 py-2 rounded-full bg-violet-primary/10 border border-violet-primary/25 text-violet-400">
              FOR STARTUPS &amp; FOUNDERS
            </span>
            <div className="h-px flex-1 bg-violet-primary/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {foundersBenefits.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02, boxShadow: "0 12px 30px -10px rgba(123, 63, 242, 0.15)", borderColor: "rgba(123, 63, 242, 0.4)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="glass-card p-6 h-full border border-white/6 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-violet-primary/15 text-violet-400 group-hover:bg-violet-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold font-heading text-white mb-2 group-hover:text-violet-400 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-muted">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* ── INSTITUTIONS SUBSECTION ── */}
        <div>
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-px flex-1 bg-violet-primary/20" />
            <span className="text-xs font-bold tracking-widest px-4 py-2 rounded-full bg-violet-primary/10 border border-violet-primary/25 text-violet-400">
              FOR COLLEGES &amp; INSTITUTIONS
            </span>
            <div className="h-px flex-1 bg-violet-primary/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {institutionsBenefits.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02, boxShadow: "0 12px 30px -10px rgba(123, 63, 242, 0.15)", borderColor: "rgba(123, 63, 242, 0.4)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="glass-card p-6 h-full border border-white/6 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-violet-primary/15 text-violet-400 group-hover:bg-violet-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold font-heading text-white mb-2 group-hover:text-violet-400 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-muted">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
