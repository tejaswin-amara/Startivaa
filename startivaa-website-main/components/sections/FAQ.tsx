"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  q: string;
  a: string;
}

function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`glass-card overflow-hidden transition-colors duration-300 border ${
        open ? "border-violet-primary/50 bg-violet-primary/5" : "border-violet-primary/15"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none focus:bg-white/3"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-bold text-white font-heading">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-violet-400 flex-shrink-0"
        >
          <ChevronDown size={18} className={open ? "text-white" : ""} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm sm:text-base leading-relaxed text-text-muted">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqs = [
  { q: "What kind of founders and startups do you work with?", a: "We work with idea-stage, early-stage and growth-stage founders building scalable, product- or service-driven startups across tech, consumer brands, agriculture, manufacturing, and service-based ventures. If you're serious about validating your idea, refining your business model, or accelerating growth — we're the right fit." },
  { q: "How is your consulting different from generic business coaches?", a: "Our consulting is founder-centric and outcome-driven. We focus on product-market fit, unit economics, fundraising strategy, and operational scalability — not just motivational talks. We combine hands-on mentoring with structured frameworks that founders can implement immediately in their day-to-day execution." },
  { q: "Can you help me validate my startup idea?", a: "Yes. We help founders clearly define their problem-solution fit, map their target customer, run quick validation experiments, and build a lean business model canvas. We also guide you on whether to pivot, persevere, or shut down a specific idea before investing heavily." },
  { q: "Do you help with fundraising and investor pitching?", a: "Absolutely. We support founders in structuring your pitch deck, defining your fundraising narrative, choosing the right investor profile, and preparing for due diligence. We also help connect you to relevant angel networks, VCs, and ecosystem partners based on your stage and geography." },
  { q: "How long does a typical engagement last?", a: "Engagements are flexible and goal-aligned. For early-stage founders, we usually work in 3–6 month programs with regular check-ins, while growth-stage founders may opt for short-term sprints or advisory retainers. The exact duration is decided in the discovery session based on your needs and milestones." },
  { q: "Do you only work with tech startups?", a: "Not at all. We work with tech, D2C, B2B, manufacturing, agriculture, food & beverage, and service-based startups. What matters most is your founder mindset, scalability potential, and commitment to execution — not the sector you operate in." },
  { q: "How do you charge for your services?", a: "We offer a mix of fixed-fee projects, milestone-based retainers, and long-term advisory packages depending on scope and stage. Early-stage founders may get access to lighter, affordable programs or cohort-based workshops, while larger startups can opt for deeper, customized advisory." },
  { q: "Can you help me build or refine my business model?", a: "Yes. We help you map your revenue model, cost structure, customer segments, and distribution channels into a clear business model canvas. We then stress-test assumptions, identify key risks, and suggest experiments to improve profitability and capital efficiency." },
  { q: "Do you work with non-Indian founders?", a: "Yes. While we are deeply rooted in the Indian ecosystem, we also advise founders from other regions — especially those targeting India or the global market. Our approach is culture-sensitive and globally relevant, whether you're based in India or abroad." },
  { q: "How do I get started with Startivaa?", a: "Simply visit startivaa.com and fill out the 'Book a Discovery Call' form. Within 24–48 hours, our team will get back to you with a short call to understand your startup, stage, and goals — and then propose the right engagement path for you." },
];

/**
 * ❓ FAQ ACCORDION SECTION COMPONENT
 * Renders accordion dropdown panels completely styled with Tailwind utility tokens.
 */
export default function FAQ() {
  return (
    <AnimatedSection>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">FAQs</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Frequently Asked <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        {/* Accordion Panels Stack */}
        <div className="flex flex-col gap-3.5">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
