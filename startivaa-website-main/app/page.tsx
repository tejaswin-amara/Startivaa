import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import WhoWeHelp from "@/components/sections/WhoWeHelp";
import Programs from "@/components/sections/Programs";
import WhyUs from "@/components/sections/WhyUs";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";
import EventsSection from "@/components/sections/EventsSection";
import GallerySection from "@/components/sections/GallerySection";
import BookingProcess from "@/components/sections/BookingProcess";
import EnquiryForm from "@/components/sections/EnquiryForm";
import FAQ from "@/components/sections/FAQ";
import AnimatedSection from "@/components/AnimatedSection";

import galleryData from "@/data/gallery.json";
import eventsData from "@/data/events.json";

import {
  Rocket,
  Users,
  BarChart3,
  Target,
  Cpu,
  Volume2,
  Building2,
  Globe,
  Network,
  ShieldCheck,
} from "lucide-react";

const servicePillars = [
  { icon: <Rocket className="w-4 h-4" />, title: "Startup Consulting" },
  { icon: <Users className="w-4 h-4" />, title: "Founder Mentorship" },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Funding Readiness & Pitching" },
  { icon: <Target className="w-4 h-4" />, title: "Go-To-Market Strategy" },
  { icon: <Cpu className="w-4 h-4" />, title: "AI & Innovation Workshops" },
  { icon: <Volume2 className="w-4 h-4" />, title: "Keynotes & Speaking" },
  { icon: <Building2 className="w-4 h-4" />, title: "Institutional Programs" },
  { icon: <Globe className="w-4 h-4" />, title: "Branding & Visibility" },
  { icon: <Network className="w-4 h-4" />, title: "Founder Networking" },
  { icon: <ShieldCheck className="w-4 h-4" />, title: "Investor Readiness" },
];

const stats = [
  { end: 13436, suffix: "+", label: "Students Mentored Around The Globe" },
  { end: 874, suffix: "+", label: "Startups Engaged Throughout The World" },
  { end: 136, suffix: "+", label: "Workshops & Sessions Around The Globe" },
  { end: 10000, suffix: "+", label: "Community Reach" },
];

const programs = [
  {
    tag: "FOR FOUNDERS",
    title: "Founder Launchpad",
    subtitle: "From Idea To Investor-Ready In 90 Days",
    features: [
      "Startup Validation & Roadmap",
      "AI Tools Integration",
      "Founder Personal Branding",
      "Pitch Deck Creation",
      "Investor Intro Sessions",
    ],
    cta: "Apply Now",
    secondary: "Book Consultation",
    highlight: true,
  },
  {
    tag: "FOR INSTITUTIONS",
    title: "Institutional Innovation",
    subtitle: "Transform Your Institution Into A Startup Launchpad",
    features: [
      "Entrepreneurship Workshops",
      "AI Awareness Sessions",
      "Innovation Bootcamps",
      "Faculty & Student Mentoring",
      "Startup Ecosystem Access",
    ],
    cta: "Request Proposal",
    secondary: "Learn More",
    highlight: false,
  },
  {
    tag: "FOR STARTUPS",
    title: "Growth Accelerator",
    subtitle: "Scale Faster With The Right Strategy & Network",
    features: [
      "Startup Strategy Deep-Dive",
      "GTM Planning & Execution",
      "Branding & Positioning",
      "Systems & Processes",
      "Investor Connect Program",
    ],
    cta: "Book Consultation",
    secondary: "View Details",
    highlight: false,
  },
  {
    tag: "CUSTOM PROGRAM",
    title: "Any Other Program",
    subtitle: "Have A Unique Need? Let's Build It Together",
    features: [
      "Fully Custom Engagement",
      "Tailored To Your Goals",
      "Flexible Format & Duration",
      "One-On-One Or Group Sessions",
      "End-To-End Support",
    ],
    cta: "Discuss Your Needs",
    secondary: "Get In Touch",
    highlight: false,
  },
];

/**
 * 👑 STARTIVAA HOMEPAGE ASSEMBLY (React Server Component)
 * Optimized layout rendering high-end server-assembled sub-sections,
 * delegating client-side hydration strictly to granular leaves.
 */
export default function Home() {
  return (
    <div className="bg-[#07070A] min-h-screen text-[#F5F5FF] font-body selection:bg-violet-primary/30 selection:text-white">
      
      {/* Main Sections Assembly */}
      <main className="relative flex flex-col w-full">
        
        {/* Hero Banner Grid with Globe */}
        <Hero servicePillars={servicePillars} />

        {/* CountUp Intersection Stats */}
        <Stats stats={stats} />

        {/* Audience Target Cards Grid */}
        <WhoWeHelp />

        {/* Program Launchpads */}
        <Programs programs={programs} />

        {/* Why Choose Startivaa Grid */}
        <WhyUs />

        {/* Executive Founders Biography Columns */}
        <Team />

        {/* Verified User Testimonials Grid */}
        <Testimonials />

        {/* Trusted Platform Branding Carousel */}
        <Partners />

        {/* Keynotes & Global Stages filtering list */}
        <EventsSection eventsData={eventsData} />

        {/* Workshop Moments & Pictures Grid */}
        <GallerySection galleryItems={galleryData} />

        {/* Timeline stepbooking pipeline */}
        <BookingProcess />

        {/* Enquiry form with mail trigger & Whatsapp chat cards */}
        <EnquiryForm />

        {/* FAQ accordions panels stack */}
        <FAQ />

        {/* ── HIGHLINE FINAL CALL TO ACTION ── */}
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-500 shadow-2xl shadow-violet-950/25">
              
              {/* Internal SVG grid pattern background overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative z-10 font-heading tracking-tight leading-tight">
                Ready to Build & Scale<br />Your Startup?
              </h2>
              <p className="text-white/80 mb-10 text-base sm:text-lg relative z-10 max-w-xl mx-auto font-medium">
                Join 13,436+ founders and institutions who&apos;ve transformed their vision with Startivaa.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <a
                  href="#enquiry"
                  className="font-bold px-10 py-4.5 rounded-full hover:scale-105 transition-all duration-300 text-base bg-white text-violet-primary hover:bg-[#F5F5FF] shadow-lg shadow-violet-950/30"
                >
                  BOOK A CONSULTATION
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </main>

    </div>
  );
}