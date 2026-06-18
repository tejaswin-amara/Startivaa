import AnimatedSection from "@/components/AnimatedSection";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
}

const testimonials: Testimonial[] = [
  { quote: "One of the most practical AI engagements our students have attended.", name: "Priya Sharma", role: "Institution Partner", org: "Symbiosis International University" },
  { quote: "Amol connects grassroots India with global AI in a way very few can.", name: "Rahul Mehta", role: "Event Organiser", org: "India Future Foundation Summit" },
  { quote: "540+ students attended Amol's engagement on AI in Everyday Life. The engagement level was exceptional — students who never asked questions were raising their hands throughout.", name: "Ananya Reddy", role: "Platform Team", org: "MentorCloud" },
  { quote: "Amol's engagement on AI and career readiness was genuinely transformative. His ability to connect complex AI concepts with real student challenges is rare — he makes the future feel accessible.", name: "Vikram Patel", role: "Faculty Member", org: "Engineering College, Amravati" },
  { quote: "One of the most impactful mentors I've encountered. Practical, passionate, and deeply knowledgeable about both AI and the real-world challenges of young founders in emerging markets.", name: "Sneha Iyer", role: "Startup Founder", org: "Startup World Cup Participant" },
];

/**
 * 📣 TESTIMONIALS SECTION COMPONENT
 * Renders quotes from verified startup founders, partners, and institutions.
 */
export default function Testimonials() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Voices From The <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Ecosystem</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="glass-card p-7 flex flex-col h-full hover:-translate-y-1 transition-all duration-300 border border-violet-primary/15 bg-[#0e0e1a]/40 group">
                
                {/* Decorative quote mark */}
                <div className="text-4xl mb-4 font-serif text-violet-primary leading-none group-hover:text-indigo-400 transition-colors">
                  &ldquo;
                </div>
                
                {/* Quote Content */}
                <p className="text-sm leading-relaxed flex-1 mb-6 text-[#C4B5D4]">
                  {t.quote}
                </p>
                
                {/* Author Card Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-violet-primary/15">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-500 shadow-md">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold font-heading text-white mb-0.5 group-hover:text-violet-400 transition-colors">
                      {t.name}
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      {t.role} &middot; {t.org}
                    </div>
                  </div>
                </div>

              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </AnimatedSection>
  );
}
