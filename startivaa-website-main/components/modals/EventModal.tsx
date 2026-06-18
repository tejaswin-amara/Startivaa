"use client";

import { useState } from "react";
import ImgField from "./ImgField";
import { X, Check } from "lucide-react";

interface EventData {
  id?: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  link: string;
  imageUrl: string;
}

interface Props {
  data: EventData;
  onSave: (d: EventData) => void;
  onClose: () => void;
}

const CATEGORIES = [
  "Conference",
  "Networking",
  "Workshop",
  "Mentorship",
  "Award",
  "Speaker",
  "Media Partner",
  "Other",
];

/**
 * 📅 EVENT MODAL FORM DIALOG
 * Handles entry form validation and layout structure for managing events in the admin panel.
 */
export default function EventModal({ data, onSave, onClose }: Props) {
  const [formState, setFormState] = useState<EventData>(data);

  const setField = (key: keyof EventData, val: string) => {
    setFormState((prev) => ({ ...prev, [key]: val }));
  };

  const isFormValid = formState.title.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[620px] max-h-[92vh] rounded-2xl overflow-hidden flex flex-col bg-[#0e0e1a] border border-violet-primary/20 shadow-2xl animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-violet-primary/10 flex items-center justify-between">
          <span className="font-bold font-heading text-white text-base">
            {formState.id ? "Edit Event" : "Add Event"}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-primary/10 hover:bg-violet-primary text-violet-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scrollable Body Form */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-4">
          
          {/* Row 1 - Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Title *
              </label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. GITEX Asia Singapore 2026"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Category
              </label>
              <select
                value={formState.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#111120] border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all text-white font-semibold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#111120]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 - Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Date Label
              </label>
              <input
                type="text"
                value={formState.date}
                onChange={(e) => setField("date", e.target.value)}
                placeholder="e.g. April 9–10, 2026"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Location Label
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="e.g. Marina Bay Sands, Singapore"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={2}
              value={formState.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Provide a concise one-sentence description about this event..."
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 resize-none font-semibold"
            />
          </div>

          {/* External Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              External Link (LinkedIn or website post)
            </label>
            <input
              type="url"
              value={formState.link}
              onChange={(e) => setField("link", e.target.value)}
              placeholder="https://linkedin.com/posts/..."
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
            />
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Event Cover Image
            </label>
            <ImgField
              value={formState.imageUrl}
              onChange={(v) => setField("imageUrl", v)}
            />
          </div>

        </div>

        {/* Modal Footer Controls */}
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
            onClick={() => isFormValid && onSave(formState)}
            disabled={!isFormValid}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
              isFormValid
                ? "bg-gradient-to-r from-violet-600 to-indigo-500 hover:scale-[1.02] shadow-violet-950/20"
                : "bg-white/10 text-white/45 cursor-not-allowed opacity-50"
            }`}
          >
            <Check size={14} />
            <span>{formState.id ? "Save Changes" : "Create Event"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
