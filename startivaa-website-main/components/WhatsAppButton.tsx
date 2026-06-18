"use client";

import { whatsappUrl } from "@/config";
import { motion } from "framer-motion";

/**
 * 💬 FLOATING WHATSAPP BUTTON COMPONENT
 * Floating bottom-right action trigger providing instant chat connection with full screen reader support and tactile spring physics.
 */
export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group focus:outline-none focus:ring-4 focus:ring-emerald-400/50 rounded-full"
      aria-label="Chat with Startivaa on WhatsApp"
      whileHover={{ y: -5, scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Dynamic pinging radial backglow */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35" />
      
      {/* Action Orb */}
      <span className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-xl shadow-emerald-950/20 transition-all duration-300">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L0 24l6.335-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.18-1.382l-.36-.214-3.762.895.954-3.668-.235-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </span>

      {/* Slide-out Text Tooltip Label */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0A0A14] text-white text-xs font-bold font-heading px-3 py-1.5 rounded-full border border-violet-primary/20 whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider">
        Chat with us
      </span>
    </motion.a>
  );
}