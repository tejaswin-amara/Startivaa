"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  person?: string;
}

interface Props {
  galleryItems: GalleryItem[];
}

const GALLERY_PAGE_SIZE = 9;

/**
 * 📸 PHOTO GALLERY SECTION COMPONENT
 * Displays a responsive image masonry grid of key moments, workshops, and ecosystem programs.
 */
export default function GallerySection({ galleryItems }: Props) {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleLimit, setVisibleLimit] = useState(GALLERY_PAGE_SIZE);
  const [mounted, setMounted] = useState(false);
  const [shuffledItems, setShuffledItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Fisher-Yates random shuffle performed hydration-safely on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const itemsCopy = [...galleryItems];
      for (let i = itemsCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]];
      }
      setShuffledItems(itemsCopy);
    }, 0);
    return () => clearTimeout(timer);
  }, [galleryItems]);

  const tabs = [
    "All",
    ...Array.from(
      new Set(
        galleryItems
          .map((g) =>
            g.person
              ? g.person.charAt(0).toUpperCase() + g.person.slice(1).toLowerCase()
              : ""
          )
          .filter(Boolean)
      )
    ),
  ];

  const currentGallerySource = mounted ? shuffledItems : galleryItems;

  const filteredGallery =
    activeTab === "All"
      ? currentGallerySource
      : currentGallerySource.filter(
          (g) => g.person?.toLowerCase() === activeTab.toLowerCase()
        );

  const visibleGallery = filteredGallery.slice(0, visibleLimit);

  // Close lightbox on Esc keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="border-t border-white/5 pt-16 mt-16">
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">Moments &amp; Memories</p>
        <h3 className="text-3xl font-bold font-heading text-white mb-3">
          Workshops, Interactions <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">&amp; More</span>
        </h3>
        <p className="text-sm text-text-muted mb-8 max-w-lg mx-auto">
          Real moments from our mentorship sessions, workshops, and global appearances.
        </p>

        {/* Tab selection buttons with sliding highlight underline (layoutId) */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setVisibleLimit(GALLERY_PAGE_SIZE);
              }}
              className={`relative text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "text-white"
                  : "bg-white/4 border border-violet-primary/20 text-text-muted hover:border-white/15 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {galleryItems.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex items-center justify-center aspect-4/3 bg-violet-primary/5 border border-dashed border-violet-primary/20"
            >
              <div className="flex flex-col items-center gap-2 opacity-40">
                <ImageIcon size={24} className="text-violet-400" />
                <span className="text-xs text-violet-400 font-medium font-heading">Photo {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {visibleGallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  onClick={() => setSelectedImage(item)}
                  className="relative rounded-2xl overflow-hidden group aspect-4/3 bg-[#0A0A14] border border-white/5 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(124,58,237,0.22)] transition-shadow duration-300"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || `Gallery image ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Person tag indicator */}
                  {item.person && (
                    <span className={`absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm z-10 ${
                      item.person.toLowerCase() === "amol" ? "bg-violet-600" : "bg-rose-600"
                    }`}>
                      {item.person}
                    </span>
                  )}

                  {/* Caption overlay on hover */}
                  {item.caption && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10">
                      <p className="text-white text-xs leading-relaxed font-semibold line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Paginate button */}
          {visibleLimit < filteredGallery.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleLimit((v) => v + GALLERY_PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md cursor-pointer"
              >
                <ChevronDown size={16} /> See More Photos
              </button>
            </div>
          )}
        </>
      )}

      {/* Expanded high-res lightbox modal overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-4/3 rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e1a] shadow-2xl cursor-default"
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.caption || "Expanded view"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-white/10 text-white hover:bg-violet-primary hover:border-violet-primary transition-all duration-200 cursor-pointer z-50"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>

              {/* Caption Overlay */}
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                  <p className="text-white text-sm sm:text-base font-semibold leading-relaxed max-w-2xl font-heading">
                    {selectedImage.caption}
                  </p>
                  {selectedImage.person && (
                    <span className={`inline-block mt-2.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm ${
                      selectedImage.person.toLowerCase() === "amol" ? "bg-violet-600" : "bg-rose-600"
                    }`}>
                      {selectedImage.person}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
