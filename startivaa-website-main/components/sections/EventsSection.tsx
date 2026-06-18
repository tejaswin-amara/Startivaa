"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  title: string;
  category: string;
  date: string;
  location: string;
  country?: string;
  imageUrl?: string;
  link: string;
}

interface Props {
  eventsData: Event[];
}

function extractISODate(dateStr: string): string {
  const year = dateStr.match(/\d{4}/)?.[0] || '2025';
  const months: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const monthMatch = dateStr.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i);
  const month = monthMatch 
    ? months[monthMatch[0].charAt(0).toUpperCase() + monthMatch[0].slice(1).toLowerCase()] 
    : '01';
  const dayMatch = dateStr.match(/\b(\d{1,2})\b/);
  const day = dayMatch ? dayMatch[1].padStart(2, '0') : '01';
  return `${year}-${month}-${day}`;
}

function extractCountry(location: string): string {
  if (location.toLowerCase().includes('singapore')) return 'SG';
  if (location.toLowerCase().includes('dubai') || location.toLowerCase().includes('uae')) return 'AE';
  if (location.toLowerCase().includes('online')) return 'ONLINE';
  return 'IN';
}

/**
 * 📅 EVENTS SECTION COMPONENT
 * An interactive filterable card deck showing Amol's global appearances and keynote events.
 */
export default function EventsSection({ eventsData }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(eventsData.map((e) => e.category)))];
  const filteredEvents =
    activeCategory === "All"
      ? eventsData
      : eventsData.filter((e) => e.category === activeCategory);

  const eventJsonLd = filteredEvents.map((ev) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": ev.title,
    "startDate": extractISODate(ev.date),
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": ev.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": ev.location.split(",")[0]?.trim() || ev.location,
        "addressRegion": ev.location.split(",")[1]?.trim() || ev.location,
        "addressCountry": ev.country || extractCountry(ev.location)
      }
    },
    "image": ev.imageUrl?.startsWith("http") ? ev.imageUrl : `https://startivaa.com${ev.imageUrl || "/images/og-image.png"}`,
    "description": ev.title,
    "performer": {
      "@type": "Person",
      "name": "Amol Agrawal"
    }
  }));

  return (
    <section id="events" className="scroll-mt-20">
      {/* dynamically render Event rich schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">Events &amp; Media</p>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-4 text-white">
              On Stage. <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Globally.</span>
            </h2>
            <p className="text-sm text-text-muted">
              Click any card to view the full post or event page.
            </p>
          </div>

          {/* Filter Categories Tabs with layoutId active sliding overlay */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "text-white shadow-md shadow-violet-950/10"
                    : "bg-white/4 border border-violet-primary/20 text-text-muted hover:border-white/15 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeEventTabHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Events Cards Grid — Fluid Spring-Rearranged Masonry layout */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((ev) => (
                <motion.div
                  key={ev.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  whileHover={{ y: -8, scale: 1.025 }}
                  className="h-full"
                >
                  <a
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card overflow-hidden group transition-all duration-300 flex flex-col h-full bg-[#0e0e1a]/45 border border-violet-primary/10 hover:border-violet-primary/30 shadow-lg hover:shadow-[0_0_25px_rgba(124,58,237,0.18)]"
                  >
                    {/* Card Thumbnail */}
                    <div className="relative h-44 overflow-hidden bg-violet-primary/5">
                      {ev.imageUrl ? (
                        <Image
                          src={ev.imageUrl}
                          alt={ev.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-500/10 to-indigo-500/5">
                          <ExternalLink size={26} className="text-violet-400/40" />
                          <span className="text-xs text-violet-400/40">View Post</span>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-violet-primary/60 backdrop-blur-xs">
                        <span className="text-white font-bold text-sm flex items-center gap-2">
                          <ExternalLink size={14} /> View Post
                        </span>
                      </div>

                      {/* Tag Badge */}
                      <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-violet-primary text-white shadow-md">
                        {ev.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-white mb-4 text-sm leading-snug font-heading group-hover:text-violet-400 transition-colors">
                        {ev.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-auto text-text-muted">
                        <span className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar size={12} className="text-violet-primary" />
                          {ev.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium truncate">
                          <MapPin size={12} className="text-violet-primary" />
                          {ev.location.split(",")[0]}
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 border border-dashed border-violet-primary/20 rounded-2xl text-text-muted text-sm font-medium">
              No appearances in this category yet. Check back soon!
            </div>
          )}

        </div>
      </AnimatedSection>
    </section>
  );
}
