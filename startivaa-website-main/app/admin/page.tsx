/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import { validatePasswordAction, publishDataAction } from "@/app/actions";
import dynamic from "next/dynamic";
import Link from "next/link";

const EventModal = dynamic(() => import("@/components/modals/EventModal"), { ssr: false });
const GalleryModal = dynamic(() => import("@/components/modals/GalleryModal"), { ssr: false });
const PasswordModal = dynamic(() => import("@/components/modals/PasswordModal"), { ssr: false });
const Confirm = dynamic(() => import("@/components/modals/Confirm"), { ssr: false });

import { Plus, Edit2, Trash2, Key, LogOut, Globe, Check, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  link: string;
  imageUrl: string;
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  person?: "amol" | "achyuth" | "";
}

type ToastState = { msg: string; type: "success" | "error" | "loading" } | null;

const SEED: Event[] = [
  { id: "1", title: "GITEX Asia Singapore 2026", date: "Apr 9–10, 2026", location: "Marina Bay Sands, Singapore", category: "Conference", description: "Media Partner at Asia's Most Global Tech, Startup & Digital Investments Event.", link: "https://www.gitex.com/", imageUrl: "/images/gitex-singapore.jpg" },
  { id: "2", title: "Capital Networking Virtual Conf", date: "April 24–25, 2025", location: "Online (US/EU/UK/CA & RoW)", category: "Networking", description: "Amol Agrawal featured at the Capital Networking Virtual Conference for LPs, GPs & Startups.", link: "#", imageUrl: "/images/capital-networking.png" },
  { id: "3", title: "AICO Dubai", date: "December 10–11, 2025", location: "Dubai, UAE", category: "Conference", description: "Speaker at AI Community Conference — Panel: AI in Healthcare.", link: "#", imageUrl: "/images/aico-dubai.png" },
  { id: "4", title: "Jagriti Yatra", date: "2025", location: "India", category: "Workshop", description: "Part of India's iconic entrepreneurship journey.", link: "#", imageUrl: "/images/jagriti-yatra.png" },
  { id: "5", title: "WEHub WE-Enable Mentorship", date: "2025", location: "Hyderabad, India", category: "Mentorship", description: "Mentor at WEHub Government of Telangana initiative.", link: "#", imageUrl: "/images/wehub-enable.png" },
  { id: "6", title: "NASA Space Apps Challenge", date: "October 4–5, 2025", location: "Hyderabad, India", category: "Award", description: "Recognised as Galactic Local Judge at the 2025 NASA International Space Apps Challenge.", link: "#", imageUrl: "/images/nasa-certificate.png" },
  { id: "7", title: "KLH University Guest Lecture", date: "2025", location: "KLH Bachupally Campus, Hyderabad", category: "Workshop", description: "Keynote speaker on entrepreneurship and startup ecosystems.", link: "#", imageUrl: "/images/klh-speaking.png" },
];

/**
 * 🔐 TOASTER BANNER NOTIFICATION COMPONENT
 */
function Toast({ msg, type, done }: { msg: string; type: "success" | "error" | "loading"; done?: () => void }) {
  useEffect(() => {
    if (type !== "loading" && done) {
      const t = setTimeout(done, 3500);
      return () => clearTimeout(t);
    }
  }, [type, done]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl text-sm font-bold text-white flex items-center gap-2.5 shadow-2xl transition-all duration-300 ${
        type === "error"
          ? "bg-rose-600 animate-shake"
          : type === "loading"
          ? "bg-[#0e0e1a] border border-violet-primary/40 animate-pulse"
          : "bg-gradient-to-r from-violet-600 to-indigo-500 animate-bounce-short"
      }`}
    >
      {type === "loading" ? (
        <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
      ) : type === "error" ? (
        <span>&times;</span>
      ) : (
        <Check size={16} />
      )}
      <span>{msg}</span>
    </div>
  );
}

/**
 * 👑 ADMIN PORTAL DASHBOARD MAIN COMPONENT
 * Coordinates secure operations, handles CRUD records, and pushes updates using server actions.
 */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [tab, setTab] = useState<"events" | "gallery">("events");
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [evModal, setEvModal] = useState<(Omit<Event, "id"> & { id?: string }) | null>(null);
  const [galModal, setGalModal] = useState(false);
  const [pwModal, setPwModal] = useState(false);
  const [delEv, setDelEv] = useState<Event | null>(null);
  const [delGal, setDelGal] = useState<GalleryItem | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [publishing, setPublishing] = useState(false);

  // Authenticate login attempt using secure server-side verification
  const handleLogin = async () => {
    setPwErr(false);
    const result = await validatePasswordAction(pw);
    if (result.success) {
      setAuthed(true);
    } else {
      setPwErr(true);
      setPw("");
    }
  };

  // Load database items on verification success
  useEffect(() => {
    if (!authed) return;
    try {
      const e = localStorage.getItem("sv_events");
      const parsedEvents = e ? JSON.parse(e) : SEED;
      const g = localStorage.getItem("sv_gallery");
      const parsedGallery = g ? JSON.parse(g) : [];
      
      Promise.resolve().then(() => {
        setEvents(parsedEvents);
        setGallery(parsedGallery);
      });
    } catch {
      Promise.resolve().then(() => {
        setEvents(SEED);
      });
    }
  }, [authed]);

  const saveEvents = useCallback((updated: Event[]) => {
    setEvents(updated);
    try {
      localStorage.setItem("sv_events", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const saveGallery = useCallback((updated: GalleryItem[]) => {
    setGallery(updated);
    try {
      localStorage.setItem("sv_gallery", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const triggerToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
  };

  // Publishes modifications using secure server actions
  const handlePublish = async () => {
    setPublishing(true);
    setToast({ msg: "Publishing changes to production...", type: "loading" });

    const res = await publishDataAction(events, gallery);

    setPublishing(false);
    if (res.success) {
      setToast({ msg: "Published! Production updates will build in ~1 minute.", type: "success" });
    } else {
      setToast({ msg: res.error || "Failed to commit changes to GitHub.", type: "error" });
    }
  };

  // Login Splash Layout Screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#07070A] flex items-center justify-center p-4 font-body">
        <div className="w-full max-w-[360px] animate-fade-in">
          
          {/* Logo & Header Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 text-white mb-4 shadow-lg shadow-violet-950/20">
              <Sparkles size={24} className="animate-pulse" />
            </div>
            <h1 className="font-bold text-2xl font-heading text-white mb-1">
              Startivaa Admin
            </h1>
            <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">
              Secure Content Manager
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#0e0e1a] border border-violet-primary/15 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Admin Password
              </label>
              <input
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setPwErr(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-hidden bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:color-text-muted/40 font-semibold"
                autoFocus
              />
              {pwErr && (
                <span className="text-xs font-semibold text-red-400 animate-shake">
                  Incorrect credentials.
                </span>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl text-white font-bold transition-all duration-300 hover:scale-102 bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20 cursor-pointer"
            >
              Sign In
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Dashboard Interface Layout
  return (
    <div className="min-h-screen bg-[#07070A] text-white font-body pb-12">
      
      {/* Dynamic Navigation Topbar Header */}
      <header className="sticky top-0 z-40 bg-[#07070A]/95 backdrop-blur-md border-b border-violet-primary/10 px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
            <span className="font-heading font-extrabold text-sm">S</span>
          </div>
          <span className="font-bold text-sm tracking-wider font-heading">
            Startivaa Panel
          </span>
        </div>

        {/* Action button rows */}
        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20 cursor-pointer"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Globe size={14} />
            )}
            <span>Publish Changes</span>
          </button>
          <button
            onClick={() => setPwModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-text-muted border border-white/10 hover:border-white/20 hover:text-white bg-white/4 hover:bg-white/7 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Key size={13} />
            <span>Password</span>
          </button>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-text-muted border border-white/10 hover:border-white/20 hover:text-white bg-white/4 hover:bg-white/7 transition-all"
          >
            View Site
          </Link>
          <button
            onClick={() => setAuthed(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 border border-rose-500/10 hover:border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Info Warning Bar */}
      <div className="bg-violet-primary/10 border-b border-violet-primary/10 px-6 py-2.5 text-center text-xs font-semibold text-violet-400 tracking-wide">
        After adding or editing content, make sure to click <strong className="text-white bg-violet-primary px-2.5 py-0.5 rounded-full ml-1">Publish Changes</strong> to trigger a fresh site compile.
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Section Tabs */}
        <div className="flex gap-1 p-1 bg-white/3 border border-violet-primary/10 rounded-xl w-fit mb-8 animate-fade-in">
          <button
            onClick={() => setTab("events")}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === "events"
                ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md shadow-violet-950/20"
                : "text-text-muted hover:text-white"
            }`}
          >
            Events &amp; Appearances ({events.length})
          </button>
          <button
            onClick={() => setTab("gallery")}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tab === "gallery"
                ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md shadow-violet-950/20"
                : "text-text-muted hover:text-white"
            }`}
          >
            Gallery Photos ({gallery.length})
          </button>
        </div>

        {/* TAB 1 - EVENTS LIST */}
        {tab === "events" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold font-heading text-lg text-white">Events</h2>
              <button
                onClick={() => setEvModal({ title: "", date: "", location: "", category: "Conference", description: "", link: "", imageUrl: "" })}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20 cursor-pointer"
              >
                <Plus size={14} /> Add Event
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e0e1a] border border-violet-primary/10 hover:border-violet-primary/25 transition-all duration-300 shadow-md group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-violet-primary/5 flex items-center justify-center text-text-muted border border-violet-primary/10 relative">
                    {ev.imageUrl ? (
                      <img src={ev.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm text-white truncate font-heading group-hover:text-violet-400 transition-colors">
                        {ev.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-primary/15 text-violet-400">
                        {ev.category}
                      </span>
                    </div>
                    <span className="text-xs text-text-muted font-medium">
                      {ev.date} &middot; {ev.location}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEvModal(ev)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-primary/10 hover:bg-violet-primary text-violet-400 hover:text-white transition-all cursor-pointer"
                      aria-label="Edit event"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDelEv(ev)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                      aria-label="Delete event"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <div className="text-center py-16 border border-dashed border-violet-primary/20 rounded-2xl text-text-muted text-sm font-medium bg-[#0e0e1a]">
                  No events added yet. Click &quot;Add Event&quot; to begin.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2 - PHOTO GALLERY LIST */}
        {tab === "gallery" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold font-heading text-lg text-white">Ecosystem Gallery</h2>
              <button
                onClick={() => setGalModal(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20 cursor-pointer"
              >
                <Plus size={14} /> Add Photo
              </button>
            </div>

            {gallery.length === 0 ? (
              <div
                onClick={() => setGalModal(true)}
                className="text-center py-16 border border-dashed border-violet-primary/20 rounded-2xl text-text-muted cursor-pointer bg-[#0e0e1a] hover:bg-[#0e0e1a]/80 transition-all flex flex-col items-center justify-center gap-2.5"
              >
                <ImageIcon size={32} className="text-violet-400 animate-pulse" />
                <p className="font-semibold text-sm text-white">No photos in gallery yet</p>
                <span className="text-xs opacity-60">Click here to upload your first highlight image</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#0e0e1a] border border-violet-primary/10 shadow-md group"
                  >
                    <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
                    
                    {/* Tag badge overlay */}
                    {item.person && (
                      <span className={`absolute top-2 left-2 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full text-white shadow-sm uppercase ${
                        item.person === "amol" ? "bg-violet-600/90" : "bg-rose-600/90"
                      }`}>
                        {item.person}
                      </span>
                    )}

                    {/* Action grid overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-3 flex flex-col justify-end gap-2.5">
                      <input
                        type="text"
                        value={item.caption}
                        onChange={(e) =>
                          saveGallery(gallery.map((g) => (g.id === item.id ? { ...g, caption: e.target.value } : g)))
                        }
                        placeholder="Add caption..."
                        className="text-[10px] w-full px-2 py-1 rounded bg-white/10 border border-white/15 text-white font-semibold outline-hidden focus:border-violet-primary/60"
                      />
                      <div className="flex gap-2 items-center">
                        <select
                          value={item.person || ""}
                          onChange={(e) =>
                            saveGallery(gallery.map((g) => (g.id === item.id ? { ...g, person: e.target.value as "amol" | "achyuth" | "" } : g)))
                          }
                          className="text-[10px] flex-1 px-2 py-1 rounded bg-white/10 border border-white/15 text-white outline-hidden font-semibold cursor-pointer"
                        >
                          <option value="" className="bg-[#111120]">All / General</option>
                          <option value="amol" className="bg-[#111120]">Amol</option>
                          <option value="achyuth" className="bg-[#111120]">Achyuth</option>
                        </select>
                        
                        <button
                          onClick={() => setDelGal(item)}
                          className="w-6 h-6 rounded flex items-center justify-center bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer flex-shrink-0"
                          aria-label="Remove image"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Photo triggers grid card */}
                <div
                  onClick={() => setGalModal(true)}
                  className="rounded-2xl border border-dashed border-violet-primary/20 aspect-4/3 bg-[#0e0e1a]/40 hover:bg-[#0e0e1a]/85 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-text-muted hover:text-white text-xs font-semibold font-heading"
                >
                  <Plus size={18} />
                  <span>Add Photo</span>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ── INTERACTIVE MODAL OVERLAYS ── */}
      {evModal && (
        <EventModal
          data={evModal}
          onSave={(d) => {
            if (d.id) {
              saveEvents(events.map((e) => (e.id === d.id ? (d as Event) : e)));
              triggerToast("Event updated successfully!");
            } else {
              saveEvents([...events, { ...d, id: Date.now().toString() } as Event]);
              triggerToast("Event created successfully!");
            }
            setEvModal(null);
          }}
          onClose={() => setEvModal(null)}
        />
      )}

      {galModal && (
        <GalleryModal
          onAdd={(item) => {
            saveGallery([...gallery, { ...item, id: Date.now().toString() }]);
            setGalModal(false);
            triggerToast("Photo added to gallery!");
          }}
          onClose={() => setGalModal(false)}
        />
      )}

      {pwModal && (
        <PasswordModal
          onClose={() => setPwModal(false)}
          onSave={(p) => {
            localStorage.setItem("sv_password", p);
            setPwModal(false);
            triggerToast("Password modified!");
          }}
        />
      )}

      {delEv && (
        <Confirm
          msg={`"${delEv.title}" will be permanently removed from data list.`}
          onYes={() => {
            saveEvents(events.filter((e) => e.id !== delEv.id));
            setDelEv(null);
            triggerToast("Event deleted.");
          }}
          onNo={() => setDelEv(null)}
        />
      )}

      {delGal && (
        <Confirm
          msg="This photo highlight will be removed from your website gallery portfolio."
          onYes={() => {
            saveGallery(gallery.filter((g) => g.id !== delGal.id));
            setDelGal(null);
            triggerToast("Photo removed.");
          }}
          onNo={() => setDelGal(null)}
        />
      )}

      {toast && (
        <Toast msg={toast.msg} type={toast.type} done={() => setToast(null)} />
      )}

    </div>
  );
}
