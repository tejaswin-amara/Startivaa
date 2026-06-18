"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  msg: string;
  onYes: () => void;
  onNo: () => void;
}

/**
 * ⚠️ CONFIRMATION OVERLAY MODAL
 * Overlay modal forcing explicit agreement before executing critical actions (e.g. deleting entries).
 */
export default function Confirm({ msg, onYes, onNo }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[380px] rounded-2xl p-6 bg-[#0e0e1a] border border-red-500/20 shadow-2xl flex flex-col gap-4 animate-scale-up">
        
        {/* Warning Icon and Header */}
        <div className="flex items-center gap-3 text-red-400">
          <AlertTriangle size={24} className="animate-pulse" />
          <p className="font-bold text-white text-base font-heading">
            Are you absolutely sure?
          </p>
        </div>
        
        {/* Description Message */}
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          {msg}
        </p>
        
        {/* Actions Button Row */}
        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={onNo}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-text-muted border border-white/10 hover:border-white/20 hover:text-white bg-white/4 hover:bg-white/7 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onYes}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 hover:scale-[1.02] shadow-md shadow-red-950/20 transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
