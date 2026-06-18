"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const bookingSteps = [
  { num: "01", title: "Connect With Us", desc: "Reach out via enquiry form or WhatsApp with your startup details." },
  { num: "02", title: "Discovery Call", desc: "Free 30-min call to understand your exact needs and goals." },
  { num: "03", title: "Custom Roadmap", desc: "We craft a tailored action plan with milestones and timelines." },
  { num: "04", title: "Mentorship & Execution", desc: "Hands-on weekly sessions, workshops, and real accountability." },
  { num: "05", title: "Growth & Scale", desc: "Ongoing support, investor intros, and ecosystem access." },
];

/**
 * 🗺️ BOOKING PROCESS SECTION COMPONENT
 * Renders a responsive timeline visualizer detailing how founders get started with Startivaa.
 */
export default function BookingProcess() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">How It Works</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            The Booking <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Process</span>
          </h2>
        </div>

        {/* Desktop Pipeline Timeline */}
        <div className="hidden lg:block relative">
          
          {/* Horizontal Connector Line */}
          <div className="absolute top-8 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-violet-primary to-transparent opacity-60" />
          
          <div className="grid grid-cols-5 gap-4">
            {bookingSteps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center group cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                
                {/* Steps Counter Orb */}
                <motion.div
                  whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(124,58,237,0.55)" }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-6 z-10 relative bg-gradient-to-br from-violet-600 to-indigo-500 shadow-[0_0_20px_rgba(124,58,237,0.35)] font-heading cursor-pointer"
                >
                  {step.num}
                </motion.div>
                
                <h4 className="font-bold text-white text-sm mb-2 font-heading group-hover:text-violet-400 transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-text-muted">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden flex flex-col gap-6">
          {bookingSteps.map((step, i) => (
            <motion.div
              key={i}
              className="flex gap-5 cursor-pointer"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              
              {/* Progress Pillar */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-violet-600 to-indigo-500 font-heading">
                  {step.num}
                </div>
                {i < bookingSteps.length - 1 && (
                  <div className="w-[1px] flex-1 mt-2 bg-violet-primary/30" />
                )}
              </div>
              
              {/* Text Block */}
              <div className="pb-6">
                <h4 className="font-bold text-white mb-1 font-heading">
                  {step.title}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </AnimatedSection>
  );
}
