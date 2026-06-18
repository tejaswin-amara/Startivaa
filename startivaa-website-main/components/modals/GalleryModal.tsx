"use client";

import { useState } from "react";
import ImgField from "./ImgField";
import { X, Plus } from "lucide-react";

interface GalleryItemData {
  imageUrl: string;
  caption: string;
  person: "amol" | "achyuth" | "";
}

interface Props {
  onAdd: (item: GalleryItemData) => void;
  onClose: () => void;
}

/**
 * 📸 GALLERY MODAL FORM DIALOG
 * Coordinates input variables for uploading and tagging pictures for the portfolio gallery.
 */
export default function GalleryModal({ onAdd, onClose }: Props) {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [person, setPerson] = useState<"amol" | "achyuth" | "">("");

  const isFormValid = url.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-[460px] rounded-2xl overflow-hidden flex flex-col bg-[#0e0e1a] border border-violet-primary/20 shadow-2xl animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-violet-primary/10 flex items-center justify-between">
          <span className="font-bold font-heading text-white text-base">
            Add Gallery Photo
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-primary/10 hover:bg-violet-primary text-violet-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body Form */}
        <div className="px-6 py-5 flex flex-col gap-4">
          
          {/* Image Upload Preview Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Upload Image *
            </label>
            <ImgField value={url} onChange={setUrl} />
          </div>

          {/* Caption Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Caption (optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Keynote speaking at Symbiosis University"
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
            />
          </div>

          {/* Co-founder Tag dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Assign to Founder (optional)
            </label>
            <select
              value={person}
              onChange={(e) => setPerson(e.target.value as "amol" | "achyuth" | "")}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#111120] border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all text-white font-semibold"
            >
              <option value="" className="bg-[#111120]">All / General</option>
              <option value="amol" className="bg-[#111120]">Amol</option>
              <option value="achyuth" className="bg-[#111120]">Achyuth</option>
            </select>
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
            onClick={() => isFormValid && onAdd({ imageUrl: url.trim(), caption, person })}
            disabled={!isFormValid}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
              isFormValid
                ? "bg-gradient-to-r from-violet-600 to-indigo-500 hover:scale-[1.02] shadow-violet-950/20"
                : "bg-white/10 text-white/45 cursor-not-allowed opacity-50"
            }`}
          >
            <Plus size={14} />
            <span>Add Photo</span>
          </button>
        </div>

      </div>
    </div>
  );
}
