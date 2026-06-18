"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Enquiry", href: "#enquiry" },
];

/**
 * 🗺️ STICKY NAVIGATION BAR COMPONENT
 * Styled entirely using Tailwind CSS tokens, with complete screen reader support,
 * smooth mobile slide down/up transitions, and active scroll section tracking.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Active scroll section tracking via IntersectionObserver ──
  useEffect(() => {
    const sections = ["home", "services", "about", "events", "enquiry"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((o) => {
        if (o) o.observer.unobserve(o.el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A14]/90 backdrop-blur-md border-b border-violet-primary/20 py-3 shadow-lg shadow-black/20"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
        
        {/* Spacer on mobile to balance the hamburger */}
        <div className="md:hidden w-8" aria-hidden="true" />

        {/* Branding Logo Link */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex flex-col leading-none cursor-pointer md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:relative group focus:outline-none focus:ring-2 focus:ring-violet-primary/50 rounded-lg px-2"
          aria-label="Startivaa home"
        >
          <span className="font-extrabold text-2xl md:text-3xl tracking-widest font-heading text-white">
            STARTI<span className="text-violet-primary group-hover:text-indigo-400 transition-colors">VAA</span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#9CA3C4] mt-0.5 uppercase">
            BUILD &bull; FUND &bull; SCALE
          </span>
        </a>

        {/* Desktop Navigation Links Row */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-bold transition-colors duration-200 relative group cursor-pointer focus:outline-none focus:text-white py-1 ${
                activeSection === link.href.slice(1) ? "text-violet-primary hover:text-violet-300" : "text-[#9CA3C4] hover:text-white"
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) ? (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-violet-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : (
                <span className="absolute -bottom-1 left-0 h-[1.5px] bg-violet-primary w-0 group-hover:w-full transition-all duration-300" />
              )}
            </a>
          ))}
          <a
            href="#enquiry"
            onClick={(e) => handleNavClick(e, "#enquiry")}
            className="text-white text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-1 bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20 focus:outline-none focus:ring-2 focus:ring-violet-primary/50"
          >
            <Sparkles size={13} className="animate-pulse" />
            <span>Book a Consultation</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white hover:text-violet-400 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-primary/50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } },
              visible: { 
                opacity: 1, 
                height: "auto", 
                transition: { 
                  height: { duration: 0.3 }, 
                  staggerChildren: 0.05,
                  delayChildren: 0.05 
                } 
              }
            }}
            className="md:hidden bg-[#0A0A14]/95 backdrop-blur-md border-t border-violet-primary/20 px-4 py-6 flex flex-col items-center gap-5 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 }
                }}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-base font-bold cursor-pointer w-full text-center py-2 hover:bg-white/3 rounded-lg transition-colors ${
                  activeSection === link.href.slice(1) ? "text-violet-primary" : "text-text-muted hover:text-white"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#enquiry"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={(e) => handleNavClick(e, "#enquiry")}
              className="text-white text-sm font-bold px-5 py-3.5 rounded-full text-center mt-2 cursor-pointer w-full max-w-xs bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20"
            >
              Book a Consultation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}