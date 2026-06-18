"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";

interface Partner {
  name: string;
  logo: string;
  link: string;
  caption: string;
}

const partners: Partner[] = [
  {
    name: "NASA Space Apps",
    logo: "/images/logo-nasa-space-apps.png",
    link: "https://www.spaceappschallenge.org/",
    caption: "Amol served as Galactic Local Judge",
  },
  {
    name: "Global AI Show",
    logo: "/images/logo-global-ai-show.png",
    link: "https://www.globalaishow.com/",
    caption: "Media & Content Partner — Dubai & Riyadh",
  },
  {
    name: "WEHub — Govt of Telangana",
    logo: "/images/wehub-logo.png",
    link: "https://wehub.telangana.gov.in/",
    caption: "Amol mentors women-led startups",
  },
  {
    name: "Startup World Cup",
    logo: "/images/startup-world-cup.png",
    link: "https://www.startupworldcup.io/",
    caption: "Amol participated as startup mentor",
  },
  {
    name: "Convergence India",
    logo: "/images/convergence-india.png",
    link: "https://www.convergenceindia.org/",
    caption: "Featured speaker & ecosystem voice",
  },
];

/**
 * 🤝 PARTNERS & ECOSYSTEM SECTION COMPONENT
 * Displays trusted platforms and partner branding links, featuring elegant image fallbacks.
 */
export default function Partners() {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        
        {/* Section Header */}
        <p className="eyebrow text-center mb-3">Ecosystem</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-3 font-heading">
          Trusted Platforms &amp; Partners
        </h2>
        <p className="text-center text-sm mb-10 text-text-muted">
          Global institutions, government bodies, and innovation networks.
        </p>

        {/* Partner Cards List */}
        <div className="flex flex-wrap justify-center items-stretch gap-6">
          {partners.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-w-[170px] max-w-[200px] glass-card hover:bg-white/5 border border-white/5 hover:border-violet-primary/30 group"
            >
              {/* Logo with dynamic state-based fallback */}
              <div className="flex items-center justify-center h-12 mb-3 w-full relative">
                {failedImages[i] ? (
                  <span className="text-violet-400 text-xs font-bold text-center font-heading transition-colors group-hover:text-violet-300">
                    {p.name}
                  </span>
                ) : (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={130}
                    height={48}
                    className="max-h-full max-w-[130px] object-contain transition-all duration-300 group-hover:scale-105"
                    onError={() => handleImageError(i)}
                  />
                )}
              </div>

              {/* Caption */}
              <span className="text-center text-xs leading-tight mt-1 text-text-muted font-semibold font-heading group-hover:text-white transition-colors">
                {p.caption}
              </span>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
