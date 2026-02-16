import Link from "next/link";
import Image from "next/image";
import { FadeIn, LiquidBlobs } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f] flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 glass-card w-[90%] max-w-7xl border-white/20">
        <Link href="/">
          <Image src="/extsy-e-logo.png" alt="House of Extsy" width={60} height={60} className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="https://calendly.com/houseofextsy/discovery" target="_blank" className="hidden md:block text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-500">
            Book a call
          </Link>
          <Link href="#pricing" className="px-6 py-2.5 text-[13px] font-semibold bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            Explore Pricing
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="relative flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-white to-[#fafafa]">
        <LiquidBlobs />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <FadeIn>
            <Image
              src="/extsy-hero.png"
              alt="House of Extsy"
              width={1100}
              height={1100}
              className="w-full max-w-[800px] h-auto mb-16"
              priority
            />
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-8xl font-black mb-12 hero-text leading-[0.9] tracking-tight text-[#1d1d1f]">
              Elite branding.<br />Delivered daily.
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="https://calendly.com/houseofextsy/discovery"
                target="_blank"
                className="w-full sm:w-auto px-10 py-5 bg-[#1d1d1f] text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              >
                Book a Discovery Call
              </Link>

              <Link
                href="https://api.whatsapp.com/send?phone=918010470077"
                target="_blank"
                className="w-full sm:w-auto px-10 py-5 bg-white border border-black/10 text-[#1d1d1f] rounded-full font-bold text-lg hover:bg-black/5 transition-all duration-500 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-[#1d1d1f] tracking-tight">Simple, daily branding.</h2>
              <p className="text-xl text-[#86868b] mt-4">Unlimited requests. 48h delivery.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-12 bg-white/40 group hover:bg-[#1d1d1f] hover:text-white transition-all duration-500 border-black/5">
                <div className="text-xs font-black uppercase tracking-widest text-[#86868b] group-hover:text-white/60 mb-2">Standard</div>
                <div className="text-3xl font-black text-[#1d1d1f] group-hover:text-white mb-6">$4,995<span className="text-sm font-medium text-[#86868b] group-hover:text-white/60">/mo</span></div>
                <button className="w-full py-3 bg-[#1d1d1f] text-white group-hover:bg-white group-hover:text-black rounded-full font-bold text-sm transition-all">Get Started</button>
              </div>
              <div className="glass-card p-8 bg-[#1d1d1f]/[0.02] border-black/10 group hover:bg-[#1d1d1f] hover:text-white transition-all duration-500">
                <div className="text-xs font-black uppercase tracking-widest text-[#86868b] group-hover:text-white/60 mb-2">Pro</div>
                <div className="text-3xl font-black text-[#1d1d1f] group-hover:text-white mb-6">$6,995<span className="text-sm font-medium text-[#86868b] group-hover:text-white/60">/mo</span></div>
                <button className="w-full py-3 bg-[#1d1d1f] text-white group-hover:bg-white group-hover:text-black rounded-full font-bold text-sm transition-all">Get Started</button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#fafafa] border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black tracking-tight uppercase text-[#1d1d1f]">House of Extsy</div>
          <div className="flex gap-8 text-[13px] text-[#86868b]">
            <Link href="https://calendly.com/houseofextsy/discovery" target="_blank" className="hover:text-[#1d1d1f] transition-colors">Book a call</Link>
            <Link href="https://api.whatsapp.com/send?phone=918010470077" target="_blank" className="hover:text-[#1d1d1f] transition-colors">WhatsApp</Link>
            <span className="text-black/20">&copy; 2026 House of Extsy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
