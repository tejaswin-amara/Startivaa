import AnimatedSection from "@/components/AnimatedSection";
import { Check } from "lucide-react";

interface Program {
  tag: string;
  title: string;
  subtitle: string;
  features: string[];
  cta: string;
  secondary: string;
  highlight: boolean;
}

interface Props {
  programs: Program[];
}

/**
 * 🛠️ PROGRAMS SECTION COMPONENT
 * Renders Startivaa's flagship programs with custom highlighted accent styling.
 */
export default function Programs({ programs }: Props) {
  return (
    <section id="services" className="scroll-mt-20">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          
          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Flagship Programs</p>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-4 text-white">
              Choose Your <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Growth Path</span>
            </h2>
            <p className="max-w-xl mx-auto text-text-muted">
              All pricing is custom — tailored to your stage, goals, and engagement scope.
            </p>
          </div>

          {/* Programs Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {programs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col h-full rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 border ${
                    p.highlight
                      ? "bg-gradient-to-br from-violet-500/18 to-indigo-500/8 border-violet-400/45 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
                      : "bg-white/3 border-white/7"
                  }`}
                >
                  {/* Highlight Ribbon */}
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Top tags and headings */}
                  <div className="text-xs font-bold tracking-widest mb-3 text-violet-400">
                    {p.tag}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm mb-6 text-text-muted">
                    {p.subtitle}
                  </p>

                  <div className="h-px bg-white/10 mb-6" />

                  {/* Features List */}
                  <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-text-muted leading-relaxed">
                        <Check size={14} className="text-violet-primary mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <a
                      href="#enquiry"
                      className={`text-center py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                        p.highlight
                          ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:opacity-90 shadow-lg shadow-violet-950/20"
                          : "bg-white/8 text-white hover:bg-white/12 border border-white/5"
                      }`}
                    >
                      {p.cta}
                    </a>
                    <a
                      href="#enquiry"
                      className="text-center py-3 rounded-xl text-xs font-medium text-text-muted hover:text-white transition-colors duration-200"
                    >
                      {p.secondary}
                    </a>
                  </div>

                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
