import Link from "next/link";
import { Marquee, FadeIn, Counter } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-[#050505]/60 backdrop-blur-xl border-b border-white/[0.04] md:px-12">
        <div className="text-lg font-bold tracking-[-0.08em] uppercase">House of Extsy</div>
        <div className="hidden space-x-10 text-[13px] font-medium text-white/40 md:flex">
          <Link href="#work" className="hover:text-white transition-colors duration-300">Work</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors duration-300">Process</Link>
          <Link href="#services" className="hover:text-white transition-colors duration-300">Scope</Link>
          <Link href="#pricing" className="hover:text-white transition-colors duration-300">Pricing</Link>
          <Link href="#faq" className="hover:text-white transition-colors duration-300">FAQ</Link>
        </div>
        <div className="flex items-center gap-5">
          <Link href="https://calendly.com/houseofextsy/discovery" target="_blank" className="hidden md:block text-[13px] font-medium text-white/40 hover:text-white transition-colors duration-300">
            Book a call
          </Link>
          <Link href="#pricing" className="px-6 py-2.5 text-[13px] font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 md:pt-56 md:pb-44 md:px-12 overflow-hidden">
        {/* Spotlight effect */}
        <div className="spotlight absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Pill badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full border border-white/10 bg-white/[0.03] text-[13px] text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Now accepting new clients for Q1 2026
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="hero-text text-[clamp(3rem,8vw,8rem)] font-black mb-10 leading-[0.92]">
              Branding on<br />
              subscription.
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="max-w-lg text-lg md:text-xl text-white/35 mb-14 leading-relaxed font-light">
              Premium brand identity, delivered fast.<br className="hidden md:block" />
              No meetings. No contracts. No BS.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="#pricing" className="group relative px-10 py-4.5 text-base font-bold bg-white text-black rounded-full transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] hover:scale-[1.03]">
                See the plans
                <span className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link href="https://calendly.com/houseofextsy/discovery" target="_blank" className="group flex items-center gap-3 px-8 py-4 text-base font-medium text-white/40 hover:text-white transition-all duration-300">
                Book a call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats bar */}
      <FadeIn>
        <div className="line-fade" />
        <div className="py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2"><Counter target={150} suffix="+" /></div>
              <div className="text-[13px] text-white/30 uppercase tracking-widest">Brands built</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2"><Counter target={48} suffix="h" /></div>
              <div className="text-[13px] text-white/30 uppercase tracking-widest">Avg. delivery</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2"><Counter target={100} suffix="%" /></div>
              <div className="text-[13px] text-white/30 uppercase tracking-widest">Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">&#8734;</div>
              <div className="text-[13px] text-white/30 uppercase tracking-widest">Revisions</div>
            </div>
          </div>
        </div>
        <div className="line-fade" />
      </FadeIn>

      {/* Marquee brand wall */}
      <section className="py-14 overflow-hidden">
        <Marquee>
          <div className="flex items-center gap-20 px-10">
            {["FLOWBASE", "MEMBERSTACK", "RELOOM", "FINSWEET", "AIRTABLE", "WEBFLOW", "NOTION", "LOOM"].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-white/[0.12] whitespace-nowrap tracking-widest uppercase hover:text-white/30 transition-colors duration-500 cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Recent Work / Portfolio */}
      <section id="work" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              <div>
                <p className="text-[13px] text-white/30 uppercase tracking-[0.2em] mb-4">Selected work</p>
                <h2 className="text-4xl md:text-7xl font-black hero-text">
                  Elite branding,<br />delivered daily.
                </h2>
              </div>
              <Link href="#pricing" className="group flex items-center gap-3 text-base font-medium text-white/40 hover:text-white transition-all duration-300">
                Start your project
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Velocity AI", category: "Full Identity System", shade: "bg-white/[0.04]" },
              { title: "Lumina", category: "Brand Strategy & Logo", shade: "bg-white/[0.07]" },
              { title: "Nexus", category: "Visual Guidelines", shade: "bg-white/[0.07]" },
              { title: "Aura", category: "Packaging & Print", shade: "bg-white/[0.04]" }
            ].map((work, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="group cursor-pointer">
                  <div className={`aspect-[16/10] ${work.shade} rounded-3xl mb-6 overflow-hidden relative border border-white/[0.04] transition-all duration-700 group-hover:border-white/10 group-hover:scale-[0.98]`}>
                    {/* Abstract pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <span className="text-[8rem] md:text-[10rem] font-black text-white/[0.03] group-hover:text-white/[0.07] transition-all duration-700 select-none">
                          {work.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    {/* Bottom label inside card */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{work.title}</h3>
                        <p className="text-white/30 text-sm">{work.category}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[13px] text-white/30 uppercase tracking-[0.2em] mb-4">How it works</p>
            <h2 className="text-4xl md:text-6xl font-black hero-text mb-20">Three simple steps.</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden">
            {[
              { num: "01", title: "Subscribe", desc: "Pick a plan and subscribe in minutes. No calls, no contracts, no hassle." },
              { num: "02", title: "Request", desc: "Add branding requests to your queue. Logos, identities, guidelines\u2014anything." },
              { num: "03", title: "Receive", desc: "Get your assets in 48 hours. Unlimited revisions until it\u2019s perfect." }
            ].map((step, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <div className="p-10 md:p-12 bg-[#050505] h-full group hover:bg-white/[0.02] transition-colors duration-500">
                  <span className="text-6xl md:text-7xl font-black text-white/[0.06] group-hover:text-white/[0.12] transition-colors duration-500 block mb-8">{step.num}</span>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Scope */}
      <section id="services" className="py-32">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[13px] text-white/30 uppercase tracking-[0.2em] mb-4">What we do</p>
            <h2 className="text-4xl md:text-6xl font-black mb-6 hero-text">
              Brand identities that<br className="hidden md:block" /> define generations.
            </h2>
            <p className="text-lg text-white/35 max-w-xl mb-20 font-light">From logos to full-scale brand systems, we cover every aspect of your visual strategy.</p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Logo Design", "Brand Strategy", "Visual Identity", "Style Guides",
              "Typography Systems", "Color Architecture", "Social Branding", "Marketing Assets",
              "Pitch Decks", "Web Design", "Iconography", "Packaging"
            ].map((service, idx) => (
              <FadeIn key={service} delay={idx * 50}>
                <div className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white hover:text-black transition-all duration-500 cursor-default overflow-hidden glow-border">
                  <div className="relative z-10 text-base md:text-lg font-semibold">{service}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 md:px-12 relative">
        <div className="spotlight absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-[13px] text-white/30 uppercase tracking-[0.2em] mb-4">Pricing</p>
              <h2 className="text-4xl md:text-6xl font-black mb-6 hero-text">Simple. Transparent.</h2>
              <p className="text-lg text-white/35 font-light">One monthly fee. Unlimited possibilities. Cancel anytime.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Standard Plan */}
            <FadeIn delay={0}>
              <div className="relative p-10 md:p-12 rounded-[2.5rem] border border-white/[0.06] bg-white/[0.015] flex flex-col h-full glow-border">
                <div className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Standard</div>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-5xl md:text-6xl font-black">$4,995</span>
                  <span className="text-base text-white/30 font-medium">/mo</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {["Unlimited branding requests", "Unlimited revisions", "48-hour delivery", "One request at a time", "Pause or cancel anytime"].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-white/50">
                      <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 bg-white/10 text-white rounded-full font-bold text-base hover:bg-white hover:text-black transition-all duration-500">Get started</button>
              </div>
            </FadeIn>

            {/* Pro Plan */}
            <FadeIn delay={150}>
              <div className="relative p-10 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.03] flex flex-col h-full glow-border">
                <div className="absolute top-8 right-8 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-wider rounded-full">Most Popular</div>
                <div className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Pro</div>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-5xl md:text-6xl font-black">$6,995</span>
                  <span className="text-base text-white/30 font-medium">/mo</span>
                </div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {["Everything in Standard", "Brand strategy included", "Two requests at a time", "Priority 24-hour delivery", "Brand messaging & voice"].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-white/50">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 bg-white text-black rounded-full font-bold text-base hover:scale-[1.02] transition-all duration-300 pulse-glow">Get started</button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div className="mt-16 text-center">
              <p className="text-white/25 mb-5 text-sm italic">Not sure yet? Let&apos;s talk about your brand.</p>
              <Link href="https://calendly.com/houseofextsy/discovery" target="_blank" className="group inline-flex items-center gap-3 text-base font-semibold text-white/50 hover:text-white transition-all duration-300">
                Book a free discovery call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-[13px] text-white/30 uppercase tracking-[0.2em] mb-4 text-center">FAQ</p>
          <h2 className="text-4xl md:text-6xl font-black mb-20 text-center hero-text">Questions &amp; Answers.</h2>
        </FadeIn>

        <div className="space-y-4">
          {[
            { q: "Why a branding subscription?", a: "Traditional agencies are slow and overpriced. We deliver elite-level branding for a flat monthly fee\u2014no contracts, no meetings, 48-hour turnaround." },
            { q: "Is there a limit to requests?", a: "None. Add as many branding requests to your queue as you want. We work through them one at a time (or two on Pro)." },
            { q: "How fast is delivery?", a: "Most requests ship in 48 hours or less. Complex brand systems may take a bit longer, but we always move fast." },
            { q: "Who does the work?", a: "Our senior brand designers. No juniors, no outsourcing. You get direct access to the people building your brand." },
            { q: "What if I\u2019m not happy?", a: "Unlimited revisions on every request. We refine until you\u2019re obsessed with the result. No questions asked." },
            { q: "Can I pause or cancel?", a: "Absolutely. Pause when things slow down, pick back up when you\u2019re ready. Cancel anytime, no penalties." }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 80}>
              <div className="group p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-500 cursor-default">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-4">
                  <span className="text-sm text-white/15 font-mono">0{idx + 1}</span>
                  {item.q}
                </h3>
                <p className="text-white/35 leading-relaxed pl-10 text-[15px]">
                  {item.a}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-44 px-6 text-center relative overflow-hidden">
        <div className="spotlight absolute inset-0 pointer-events-none opacity-60" />
        <FadeIn>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-[8rem] font-black mb-10 hero-text leading-[0.85]">
              Ready?
            </h2>
            <p className="text-lg text-white/30 mb-12 font-light">Your brand deserves better. Let&apos;s build something iconic.</p>
            <Link href="#pricing" className="inline-block px-14 py-6 text-xl font-black bg-white text-black rounded-full hover:scale-105 transition-all duration-500 pulse-glow">
              Get Started Now
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <div className="line-fade" />
      <footer className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-lg font-bold tracking-[-0.08em] uppercase mb-2">House of Extsy</div>
            <p className="text-white/20 text-[13px]">&copy; 2026 House of Extsy. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-[13px] text-white/25">
            <Link href="#" className="hover:text-white transition-colors duration-300">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Instagram</Link>
            <Link href="https://calendly.com/houseofextsy/discovery" target="_blank" className="hover:text-white transition-colors duration-300">Book a call</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
