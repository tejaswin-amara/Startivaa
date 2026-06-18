"use client";

import { useState } from "react";
import { uploadImageAction } from "@/app/actions";
import { Upload, X, Loader2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

/**
 * ☁️ CLOUDINARY UPLOAD HELPER
 * Employs secure server-side actions to execute asset uploads without exposing presets or cloud names.
 */
function CloudinaryUpload({ onUrl }: { onUrl: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }
    setError("");
    setUploading(true);

    try {
      // Read file as base64 data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        
        // Execute server action upload
        const result = await uploadImageAction(base64data);
        if (result.success && result.secure_url) {
          onUrl(result.secure_url);
        } else {
          setError(result.error || "Upload failed. Verify server environment configuration.");
        }
        setUploading(false);
      };
    } catch {
      setError("Upload failed. Please check your network connection.");
      setUploading(false);
    }
  };

  return (
    <div
      onClick={() => {
        if (!uploading) {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (e) => {
            const f = (e.target as HTMLInputElement).files?.[0];
            if (f) processFile(f);
          };
          input.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f) processFile(f);
      }}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
        drag
          ? "border-violet-primary bg-violet-primary/10"
          : "border-violet-primary/20 bg-white/2 hover:bg-white/4 hover:border-violet-primary/45"
      } ${uploading ? "cursor-wait opacity-65" : ""}`}
    >
      {uploading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
          <p className="text-xs text-violet-400 font-semibold font-heading">
            Uploading asset...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-text-muted text-xs font-semibold font-heading">
          <Upload size={20} className="text-violet-400 animate-pulse" />
          <span>Click or drag &amp; drop to upload</span>
          <span className="text-[10px] opacity-50 font-normal">PNG, JPG, WEBP</span>
          {error && <span className="text-[10px] text-red-400 font-medium mt-1">{error}</span>}
        </div>
      )}
    </div>
  );
}

/**
 * 🖼️ IMAGE UPLOAD & PREVIEW CONTROLLER
 * Dynamic input container showing thumbnail preview or Cloudinary upload box.
 */
export default function ImgField({ value, onChange }: Props) {
  const isValid = value && (value.startsWith("http") || value.startsWith("/"));

  return (
    <div className="flex flex-col gap-3">
      {isValid ? (
        <div className="relative rounded-xl overflow-hidden h-28 border border-violet-primary/20 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Asset Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2.5 right-2.5 bg-black/75 hover:bg-black text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <CloudinaryUpload onUrl={onChange} />
      )}
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an external image URL directly..."
        className="w-full px-3.5 py-2.5 rounded-lg text-white text-xs outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 font-semibold"
      />
    </div>
  );
}
