"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { whatsappUrl } from "@/config";

const stages = ["Idea Stage", "MVP", "Early Revenue", "Scaling", "Fundraising"];
const serviceOptions = ["Founder Launchpad", "Institutional Innovation Program", "Growth Accelerator", "1:1 Mentorship", "Other"];

/**
 * 📝 ENQUIRY FORM SECTION COMPONENT
 * Implements interactive contact form prefilling and dynamic mail triggers with WhatsApp shortcuts.
 */
export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    stage: "",
    service: "",
    message: "",
    otherQuestion: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setFormStatus("sending");
    const subject = `Startivaa Enquiry — ${formData.service || "General"}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nRole: ${formData.role}\nStartup/Company: ${formData.company}\nStage: ${formData.stage}\nService: ${formData.service}\n\nWhat are you looking for:\n${formData.message}\n\nAny other question:\n${formData.otherQuestion}`;
    
    // Open Compose window with formatted subject and body
    window.open(
      `https://mail.google.com/mail/?view=cm&to=hello@startivaa.com&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
    
    setTimeout(() => setFormStatus("sent"), 800);
  };

  return (
    <section id="enquiry" className="scroll-mt-20">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          
          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Get In Touch</p>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
              Start Your Journey <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Today</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left Column - Mail prefill Form */}
            <div className="lg:col-span-3 glass-card p-8 bg-[#0e0e1a]/60">
              {formStatus === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 bg-violet-primary/20">
                    <CheckCircle size={36} className="text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">
                    Gmail Opened!
                  </h3>
                  <p className="text-text-muted mb-6">
                    Your message is pre-filled in Gmail. Just hit Send!
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        role: "",
                        stage: "",
                        service: "",
                        message: "",
                        otherQuestion: "",
                      });
                    }}
                    className="text-sm px-6 py-2 rounded-full border border-violet-primary/30 text-violet-400 hover:bg-violet-primary/10 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-1.5 block text-text-muted font-medium">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block text-text-muted font-medium">Email Address *</label>
                      <input
                        type="email"
                        placeholder="you@startup.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone and Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-1.5 block text-text-muted font-medium">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block text-text-muted font-medium">I Am A</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#141419] border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all text-white"
                      >
                        <option value="" disabled>Select role</option>
                        {["Student", "Startup Founder", "College / Institute", "Other"].map((r) => (
                          <option key={r} value={r} className="bg-[#141419]">{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Company and Startup Stage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs mb-1.5 block text-text-muted font-medium">Startup / Company</label>
                      <input
                        type="text"
                        placeholder="Your Startup or Institution"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block text-text-muted font-medium">Startup Stage</label>
                      <select
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#141419] border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all text-white"
                      >
                        <option value="" disabled>Select stage</option>
                        {stages.map((s) => (
                          <option key={s} value={s} className="bg-[#141419]">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Interested Program */}
                  <div>
                    <label className="text-xs mb-1.5 block text-text-muted font-medium">Interested In</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[#141419] border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all text-white"
                    >
                      <option value="" disabled>Select program</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-[#141419]">{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Requirements Description */}
                  <div>
                    <label className="text-xs mb-1.5 block text-text-muted font-medium">
                      What Are You Looking For? <span className="opacity-60 font-normal">(100–200 words)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what you're looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 resize-none"
                    />
                  </div>

                  {/* Additional context */}
                  <div>
                    <label className="text-xs mb-1.5 block text-text-muted font-medium">Any Other Question?</label>
                    <textarea
                      rows={2}
                      placeholder="Any specific questions or context you'd like us to know..."
                      value={formData.otherQuestion}
                      onChange={(e) => setFormData({ ...formData, otherQuestion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none bg-white/5 border border-violet-primary/20 focus:border-violet-primary/60 focus:ring-1 focus:ring-violet-primary/30 transition-all placeholder:text-text-muted/40 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === "sending" || !formData.name || !formData.email || !formData.phone}
                    className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md shadow-violet-950/20"
                  >
                    {formStatus === "sending" ? (
                      "Opening Gmail..."
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message via Gmail</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-text-muted font-medium">
                    Opens Gmail with pre-formatted layout &middot; hello@startivaa.com
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Contact info sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              
              {/* Information Card */}
              <div className="glass-card p-6 bg-[#0e0e1a]/60">
                <h3 className="font-bold text-white mb-5 text-sm font-heading">Contact Information</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: <Mail size={14} />, label: "Email", val: "hello@startivaa.com" },
                    { icon: <Phone size={14} />, label: "Phone", val: "+91 94032 83555" },
                    { icon: <MapPin size={14} />, label: "Location", val: "Hyderabad, Telangana, India" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-violet-primary/15 text-violet-400 group-hover:bg-violet-primary group-hover:text-white transition-all duration-200">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[10px] mb-0.5 text-text-muted font-bold tracking-wider uppercase">
                          {item.label}
                        </div>
                        <div className="text-white text-sm font-medium">
                          {item.val}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Whatsapp Chat Box Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 border border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-950/5 group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-500 text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L0 24l6.335-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.18-1.382l-.36-.214-3.762.895.954-3.668-.235-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm mb-0.5 font-heading group-hover:text-emerald-400 transition-colors">
                    Chat on WhatsApp
                  </div>
                  <div className="text-xs text-text-muted font-medium">
                    +91 94032 83555 &middot; Expect a reply within 24–48 hours
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
