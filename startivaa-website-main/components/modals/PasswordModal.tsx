"use client";

import { useState } from "react";
import { X, Check, ShieldAlert } from "lucide-react";
import { validatePasswordAction } from "@/app/actions";

interface Props {
  onClose: () => void;
  onSave: (pw: string) => void;
}

/**
 * 🔑 PASSWORD MODAL DIALOG
 * Renders securely aligned controls with detailed security warnings to update dashboard entry passwords.
 */
export default function PasswordModal({ onClose, onSave }: Props) {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    const verification = await validatePasswordAction(currentPw);
    if (!verification.success) {
      setError("Current password verification failed.");
      return;
    }
    if (newPw.length < 6) {
      setError("New password must contain at least 6 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setError("Confirmation passwords do not match.");
      return;
    }

    onSave(newPw);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[400px] rounded-2xl overflow-hidden flex flex-col bg-[#0e0e1a] border border-violet-primary/20 shadow-2xl animate-scale-up">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-violet-primary/10 flex items-center justify-between">
          <span className="font-bold font-heading text-white text-base">
            Change Password
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-primary/10 hover:bg-violet-primary text-violet-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          
          {/* Environment Variable Alert */}
          <div className="flex items-start gap-3 p-3 rounded-xl border border-violet-primary/20 bg-violet-primary/5 text-text-muted text-[11px] leading-relaxed">
            <ShieldAlert size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Production Security Tip</span>
              Password changes here are saved to this browser&apos;s local storage. To configure the main admin credentials in production, configure the <code className="text-violet-400 font-semibold font-heading bg-white/5 px-1 py-0.5 rounded">ADMIN_PASSWORD</code> environment variable inside Vercel.
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Current Password
            </label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => {
                setCurrentPw(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              New Password
            </label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => {
                setNewPw(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => {
                setConfirmPw(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-semibold animate-shake">
              {error}
            </p>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-violet-primary/10 flex justify-end gap-3 bg-[#0e0e1a]/95">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-text-muted border border-white/10 hover:border-white/20 hover:text-white bg-white/4 hover:bg-white/7 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-500 hover:scale-[1.02] shadow-violet-950/20"
          >
            <Check size={14} />
            <span>Update Password</span>
          </button>
        </div>

      </div>
    </div>
  );
}
