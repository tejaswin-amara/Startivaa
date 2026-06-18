import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config";

export default function Footer() {
  return (
    <footer className="border-t border-violet-primary/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div className="flex flex-col gap-4">
          <div>
            <span className="font-bold text-2xl tracking-widest font-heading">
              STARTI<span className="text-violet-primary">VAA</span>
            </span>
            <p className="text-[10px] tracking-[0.3em] text-text-muted mt-1">BUILD • FUND • SCALE</p>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">Empowering India&apos;s next generation of founders with mentorship, strategy, and a powerful ecosystem.</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            <a href="https://www.linkedin.com/company/startivaa" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-violet-primary hover:border-violet-primary/50 transition-colors text-xs border border-violet-primary/20 px-3 py-1.5 rounded-full">LinkedIn</a>
            <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-violet-primary hover:border-violet-primary/50 transition-colors text-xs border border-violet-primary/20 px-3 py-1.5 rounded-full">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61590082317058" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-violet-primary hover:border-violet-primary/50 transition-colors text-xs border border-violet-primary/20 px-3 py-1.5 rounded-full">Facebook</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4 text-white font-heading">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            {[["Home","#home"],["Services","#services"],["About","#about"],["Events","#events"],["Enquiry","#enquiry"]].map(([label, href]) => (
              <li key={href}><a href={href} className="text-text-muted text-sm hover:text-violet-primary transition-colors">{label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4 text-white font-heading">Programs</h4>
          <ul className="flex flex-col gap-3 text-text-muted text-sm">
            {["Founder Launchpad","Institutional Innovation","Startup Growth Accelerator","1:1 Mentorship","GTM Workshops"].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-4 text-white font-heading">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-text-muted text-sm"><Mail size={14} className="text-violet-primary" />{siteConfig.email}</li>
            <li className="flex items-center gap-2 text-text-muted text-sm"><Phone size={14} className="text-violet-primary" />{siteConfig.phone}</li>
            <li className="flex items-center gap-2 text-text-muted text-sm"><MapPin size={14} className="text-violet-primary" />{siteConfig.address}</li>
          </ul>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#25D366] text-sm font-medium px-4 py-2.5 rounded-full transition-all duration-300 hover:bg-[#25D366]/20 bg-[#25D366]/10 border border-[#25D366]/30">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L0 24l6.335-1.508A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.18-1.382l-.36-.214-3.762.895.954-3.668-.235-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

      </div>
      <div className="border-t border-violet-primary/10 py-5 text-center text-text-muted text-xs">
        © {new Date().getFullYear()} Startivaa. All rights reserved. Built with ❤️ in India for Global Startups.
      </div>
    </footer>
  );
}