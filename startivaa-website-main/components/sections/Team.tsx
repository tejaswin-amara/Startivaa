"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import { ExternalLink, Play, ChevronDown, Award, Globe, Rocket, School, Handshake, ShieldCheck, Coins } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link?: string;
}

const amolAchievements: Achievement[] = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "NASA Space Apps — Jury", desc: "Galactic Local Judge across 150+ countries", link: "https://www.spaceappschallenge.org/" },
  { icon: <Globe className="w-5 h-5" />, title: "Global AI Show — Media & Content Partner", desc: "Official partner for Dubai & Riyadh editions", link: "https://www.globalaishow.com/" },
  { icon: <Globe className="w-5 h-5" />, title: "GITEX Asia & Singapore 2026 — Ecosystem Voice", desc: "Featured at Marina Bay Sands, Singapore", link: "https://www.gitex.com/" },
  { icon: <Award className="w-5 h-5" />, title: "Startup World Cup", desc: "Mentor & ecosystem participant at global startup competition", link: "https://www.startupworldcup.io/" },
  { icon: <School className="w-5 h-5" />, title: "AICTE Leadership Award", desc: "Excellence in Education — Uddipan 2025", link: "https://www.aicte-india.org/" },
  { icon: <Handshake className="w-5 h-5" />, title: "WEHub — Govt of Telangana", desc: "Startup Mentor, women-led startup program", link: "https://wehub.telangana.gov.in/" },
];

const achyuthAchievements: Achievement[] = [
  { icon: <Coins className="w-5 h-5" />, title: "₹200M Enterprise", desc: "Bootstrapped Nutri Fresh Eggs into a multi-million rupee revenue brand" },
  { icon: <Award className="w-5 h-5" />, title: "Forbes India Feature", desc: "Profiled in 2020 as a key trendsetter in Indian agribusiness" },
  { icon: <Award className="w-5 h-5" />, title: "Business Icon Under 30", desc: "Telugu region's outstanding young entrepreneur award" },
  { icon: <Rocket className="w-5 h-5" />, title: "Suregrow Farms", desc: "Founded & scaled a sustainable poultry brand across Telangana, AP & Tamil Nadu" },
  { icon: <School className="w-5 h-5" />, title: "JNTUH Council Member", desc: "Honorable academic council member at Jawaharlal Nehru Technological University" },
  { icon: <Volume2Icon className="w-5 h-5" />, title: "TEDx Speaker", desc: "Shared insights on modern agriculture, technology integration & youth entrepreneurship" },
];

function Volume2Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function AchievementCard({ a }: { a: Achievement }) {
  const content = (
    <>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-violet-primary/15 text-violet-400">
        {a.icon}
      </div>
      <div>
        <div className="text-sm font-semibold font-heading text-white mb-0.5 group-hover:text-violet-400 transition-colors">
          {a.title}
        </div>
        <div className="text-xs leading-relaxed text-text-muted">
          {a.desc}
        </div>
      </div>
    </>
  );

  if (a.link) {
    return (
      <a
        href={a.link}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-xl flex items-start gap-3 transition-all duration-200 group bg-violet-primary/5 border border-violet-primary/10 hover:bg-violet-primary/10 hover:border-violet-primary/20"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="p-4 rounded-xl flex items-start gap-3 bg-violet-primary/5 border border-violet-primary/10 group">
      {content}
    </div>
  );
}

/**
 * 👥 TEAM SECTION COMPONENT
 * Renders executive co-founder profile biography columns with dynamic achievements collapsibles.
 */
export default function Team() {
  const [showAllAmol, setShowAllAmol] = useState(false);
  const [showAllAchyuth, setShowAllAchyuth] = useState(false);

  return (
    <section id="about" className="scroll-mt-20">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">The Team</p>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
              Meet the <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Founders</span>
            </h2>
          </div>

          {/* Amol Agrawal Profile */}
          <div className="glass-card p-8 mb-8 border border-white/5 bg-[#0e0e1a]/80">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Profile Details */}
              <div className="flex flex-col">
                <div className="w-28 h-28 rounded-2xl overflow-hidden mb-5 flex-shrink-0 border-2 border-violet-primary/40 relative">
                  <Image src="/images/amol-profile.png" alt="Amol Agrawal" width={112} height={112} className="w-full h-full object-cover object-top" priority />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-1">Amol Agrawal</h3>
                <p className="text-sm mb-5 text-violet-400 font-semibold">Co-Founder | Mentor &amp; Ecosystem Strategist</p>
                <p className="text-sm leading-relaxed mb-6 text-text-muted">
                  AI Speaker, Startup Ecosystem Builder, and Innovation-Focused Mentor helping founders, startups, students, and institutions grow through mentorship, consulting, and strategic partnerships.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Startup Ecosystems", "AI Innovation", "Founder Mentorship"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full font-medium bg-violet-primary/10 border border-violet-primary/20 text-violet-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/amoloagrawal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold w-fit transition-all duration-300 hover:scale-105 bg-gradient-to-r from-violet-600 to-indigo-500 text-white"
                >
                  <ExternalLink size={14} /> <span>LinkedIn</span>
                </a>
              </div>

              {/* Achievements Column */}
              <div className="flex flex-col gap-3">
                {amolAchievements.slice(0, 3).map((a, i) => (
                  <AchievementCard key={i} a={a} />
                ))}

                {/* Hidden Collapsible Achievements */}
                {showAllAmol &&
                  amolAchievements.slice(3).map((a, i) => (
                    <AchievementCard key={i} a={a} />
                  ))}

                {/* See More Buttons */}
                <button
                  onClick={() => setShowAllAmol((v) => !v)}
                  className="text-xs font-bold flex items-center gap-1.5 mt-1 transition-colors duration-200 text-violet-400 hover:text-white w-fit cursor-pointer"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showAllAmol ? "rotate-180" : ""}`}
                  />
                  <span>{showAllAmol ? "Show Less" : `See All (${amolAchievements.length - 3} more)`}</span>
                </button>

                {/* Dynamic YouTube Podcast Embed Call */}
                <a
                  href="https://www.youtube.com/watch?v=mul1VqKUmjQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-red-500/10 group bg-red-500/5 border border-red-500/15"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-red-500/15 text-red-500">
                    <Play size={16} className="fill-red-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-heading text-white group-hover:text-red-400 transition-colors">
                      Watch on YouTube
                    </div>
                    <div className="text-xs text-text-muted">
                      AI &amp; Startup insights — TGV Podcast &amp; more
                    </div>
                  </div>
                </a>
              </div>

            </div>
          </div>

          {/* Achyuth Reddy Profile */}
          <div className="glass-card p-8 border border-white/5 bg-[#0e0e1a]/80">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Profile Details */}
              <div className="flex flex-col">
                <div className="w-28 h-28 rounded-2xl overflow-hidden mb-5 flex-shrink-0 border-2 border-violet-primary/40 relative">
                  <Image src="/images/achyuth.png" alt="Achyuth Reddy Gomaram" width={112} height={112} className="w-full h-full object-cover object-top" priority />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-1">Achyuth Reddy Gomaram</h3>
                <p className="text-sm mb-5 text-violet-400 font-semibold">Co-Founder | Business Strategist &amp; Investor</p>
                <p className="text-sm leading-relaxed mb-6 text-text-muted">
                  Serial entrepreneur and active angel investor — from college dropout to Forbes India feature. Bootstrapped Nutri Fresh Eggs into a ₹200 Million enterprise and founded Suregrow Farms across Telangana, Andhra Pradesh, and Tamil Nadu. TEDx Speaker. JNTUH Academic Council Member.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Angel Investing", "Agribusiness", "Business Scaling"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full font-medium bg-violet-primary/10 border border-violet-primary/20 text-violet-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/achyuthreddyg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold w-fit transition-all duration-300 hover:scale-105 bg-gradient-to-r from-violet-600 to-indigo-500 text-white"
                >
                  <ExternalLink size={14} /> <span>LinkedIn</span>
                </a>
              </div>

              {/* Achievements Column */}
              <div className="flex flex-col gap-3">
                {achyuthAchievements.slice(0, 3).map((a, i) => (
                  <AchievementCard key={i} a={a} />
                ))}

                {/* Collapsible achievements */}
                {showAllAchyuth &&
                  achyuthAchievements.slice(3).map((a, i) => (
                    <AchievementCard key={i} a={a} />
                  ))}

                {/* Toggle See More Achievements */}
                <button
                  onClick={() => setShowAllAchyuth((v) => !v)}
                  className="text-xs font-bold flex items-center gap-1.5 mt-1 transition-colors duration-200 text-violet-400 hover:text-white w-fit cursor-pointer"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showAllAchyuth ? "rotate-180" : ""}`}
                  />
                  <span>{showAllAchyuth ? "Show Less" : `See All (${achyuthAchievements.length - 3} more)`}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
