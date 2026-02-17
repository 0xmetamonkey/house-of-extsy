"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FadeIn, LiquidBlobs } from "./components";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Plan Configuration - Focused on "Building" & "AI"
const PLANS = [
  {
    id: "mvp-build",
    name: "AI MVP Build",
    usdPrice: 3495,
    description: "Rapidly build and launch your AI-first product.",
    features: [
      "Custom AI feature development",
      "Full-stack product building",
      "UI/UX for AI interfaces",
      "API & LLM integrations",
      "1 product launch per month",
      "Cloud infrastructure setup"
    ]
  },
  {
    id: "ai-engineering",
    name: "AI Engineering",
    usdPrice: 5495,
    description: "Your dedicated AI engineering & automation partner.",
    popular: true,
    features: [
      "Everything in MVP Build",
      "Deep workflow automation",
      "Custom RAG & Vector setups",
      "Fine-tuning & model optimization",
      "Direct technical architect access",
      "Weekly build sprints",
      "Enterprise security audits"
    ]
  },
  {
    id: "scale-ops",
    name: "Scale & Ops",
    usdPrice: 8995,
    description: "Full-scale product evolution and infrastructure scaling.",
    features: [
      "Dedicated build team of 3+",
      "High-scale AI infrastructure",
      "Legacy system AI migration",
      "Advanced 24/7 reliability",
      "Unlimited technical advisory",
      "Strategic CTO-level partner",
      "Product-market fit scaling"
    ]
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [geoData, setGeoData] = useState<{ countryCode: string; currency: string; symbol: string } | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [loadingPricing, setLoadingPricing] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [typedText, setTypedText] = useState("");
  const headline = "Build faster. With AI engine.";

  useEffect(() => {
    setMounted(true);
    fetchLocalization();

    // Typewriter effect for techy feel
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(headline.slice(0, i));
      i++;
      if (i > headline.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const fetchLocalization = async () => {
    try {
      let countryCode = "US";
      const params = new URLSearchParams(window.location.search);
      const override = params.get("country")?.toUpperCase();

      if (override) {
        countryCode = override;
      } else {
        try {
          const geoRes = await fetch("https://freeipapi.com/api/json");
          if (geoRes.ok) {
            const geo = await geoRes.json();
            countryCode = geo.countryCode || "US";
          } else {
            throw new Error("FreeIPAPI failed");
          }
        } catch (err) {
          try {
            const backupRes = await fetch("https://ipapi.co/json/");
            if (backupRes.ok) {
              const backupGeo = await backupRes.json();
              countryCode = backupGeo.country_code || "US";
            }
          } catch (backupErr) { }
        }
      }

      const isIndia = countryCode === "IN";
      const localCurrency = isIndia ? "INR" : "USD";
      let rate = 1;
      try {
        const rateRes = await fetch("https://open.er-api.com/v6/latest/USD");
        if (rateRes.ok) {
          const rateData = await rateRes.json();
          rate = rateData.rates[localCurrency] || 1;
        }
      } catch (err) {
        if (isIndia) rate = 83;
      }
      setGeoData({ countryCode, currency: localCurrency, symbol: isIndia ? "₹" : "$" });
      setExchangeRate(rate);
    } catch (err) {
      setGeoData({ countryCode: "US", currency: "USD", symbol: "$" });
      setExchangeRate(1);
    } finally {
      setLoadingPricing(false);
    }
  };

  const getPriceData = (usdPrice: number) => {
    const isIndia = geoData?.countryCode === "IN";
    const pppMultiplier = isIndia ? 0.4 : 1.0;
    const adjustedUsd = usdPrice * pppMultiplier;
    return {
      amount: Math.round(adjustedUsd * exchangeRate),
      currency: geoData?.currency || "USD",
      symbol: geoData?.symbol || "$"
    };
  };

  const handlePayment = (planName: string, usdPrice: number) => {
    const { amount, currency } = getPriceData(usdPrice);
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Try refreshing.");
      return;
    }
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId || keyId === "rzp_test_placeholder") {
      alert("Razorpay Key ID missing in .env.local");
      return;
    }
    const options = {
      key: keyId,
      amount: amount * 100,
      currency: currency,
      name: "House of Extsy",
      description: `${planName} Subscription`,
      image: "/extsy-e-logo.png",
      handler: (res: any) => alert("Payment Successful! ID: " + res.razorpay_payment_id),
      theme: { color: "#1d1d1f" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col selection:bg-black/5 selection:text-black scroll-smooth">
      {/* 1px Grid Background Layer */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 glass-card w-[90%] max-w-7xl border-white/20">
        <Link href="/" className="hover:scale-105 transition-transform duration-500">
          <Image src="/extsy-e-logo.png" alt="House of Extsy" width={100} height={100} className="h-12 w-auto" />
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowAbout(true)}
            className="hidden md:block text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-500"
          >
            About
          </button>
          <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="hidden md:block text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-500">
            Book a call
          </Link>
          <Link href="#pricing" className="px-6 py-2.5 text-[13px] font-semibold bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-all duration-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] active:scale-95">
            View Plans
          </Link>
        </div>
      </nav>

      {/* About Us Popup (Modal) */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setShowAbout(false)}
          />
          <FadeIn>
            <div className="relative glass-card bg-white/80 p-10 sm:p-16 max-w-2xl w-full border-white/30 shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden">
              <button
                onClick={() => setShowAbout(false)}
                className="absolute top-8 right-8 text-[#86868b] hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-4 font-bold">/ Entity Info</div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6">House of Extsy</h2>
                <div className="w-20 h-1 bg-black mb-8" />
                <p className="text-lg sm:text-xl text-[#1d1d1f]/70 leading-relaxed mb-8">
                  We are a premium AI-first build agency that delivers high-performance digital products in fast-paced weekly sprints. We merge elite engineering with technical creative media to craft the next generation of software builds.
                </p>
                <div className="p-8 bg-black/[0.03] rounded-3xl border border-black/5">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#86868b] mb-4">Communication_Channel</div>
                  <Link
                    href="mailto:extsystudios@gmail.com"
                    className="text-xl sm:text-2xl font-bold hover:text-blue-600 transition-colors flex items-center gap-3"
                  >
                    extsystudios@gmail.com
                    <svg className="w-5 h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Main Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-white">
        <LiquidBlobs />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <FadeIn>
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full scale-150 opacity-40" />
              <Image
                src="/extsy-hero.png"
                alt="House of Extsy"
                width={1100}
                height={1100}
                className="relative w-full max-w-[750px] h-auto"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="font-mono text-[11px] text-blue-600 mb-6 font-bold uppercase tracking-[0.3em]">/ system.online_v4</div>
            <h1 className="text-5xl md:text-[110px] font-black mb-12 hero-text leading-[0.85] tracking-tight text-[#1d1d1f] min-h-[1.8em]">
              {typedText}
              <span className="inline-block w-2 md:w-3 h-[0.8em] bg-blue-600 ml-2 animate-pulse align-middle" />
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto leading-relaxed mb-12 lg:px-10">
              Elite engineering for the AI era. We build products, automate workflows, and drive high-scale performance in weekly increments.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
              <Link
                href="https://calendly.com/extsystudios/30min"
                target="_blank"
                className="w-full sm:w-auto px-12 py-6 bg-[#1d1d1f] text-white rounded-full font-bold text-lg hover:bg-blue-600 hover:scale-105 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all duration-700 active:scale-95"
              >
                Book a Sprint
              </Link>

              <Link
                href="https://api.whatsapp.com/send?phone=918010470077"
                target="_blank"
                className="w-full sm:w-auto px-12 py-6 bg-white border border-black/10 text-[#1d1d1f] rounded-full font-bold text-lg hover:bg-black/5 transition-all duration-700 flex items-center justify-center gap-3 active:scale-95"
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
      <section id="pricing" className="py-40 px-6 bg-white border-t border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-8xl font-black text-[#1d1d1f] tracking-tighter mb-8 leading-[0.9]">Built with AI.</h2>
              <p className="text-xl md:text-2xl text-[#86868b] max-w-3xl mx-auto leading-relaxed px-4">
                Premium product builds, delivered in weekly sprints. Your dedicated AI engineering partner.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PLANS.map((plan, idx) => {
                const priceData = getPriceData(plan.usdPrice);
                return (
                  <div key={plan.id} className="glass-card flex flex-col p-10 bg-white/40 group hover:bg-white hover:shadow-[0_45px_100px_rgba(0,0,0,0.06)] transition-all duration-700 border-black/5 cursor-default relative overflow-hidden">
                    {plan.popular && (
                      <div className="absolute top-10 right-10 px-3 py-1 bg-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)]">Featured</div>
                    )}
                    <div className="mb-10">
                      <div className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4 opacity-70">// CONFIG.PLAN_0{idx + 1}</div>
                      <h3 className="text-3xl font-black text-[#1d1d1f] mb-2 tracking-tight">{plan.name}</h3>
                      <div className="text-5xl font-black text-[#1d1d1f] mb-6 tracking-tighter">
                        {loadingPricing ? (
                          <span className="opacity-20 animate-pulse">---</span>
                        ) : (
                          <>
                            {priceData.symbol}{priceData.amount.toLocaleString()}
                            <span className="text-sm font-mono text-[#86868b] ml-1">/mo</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-[#86868b] leading-relaxed font-medium">{plan.description}</p>
                    </div>

                    <ul className="flex-grow space-y-4 mb-10">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-[13px] font-medium text-[#1d1d1f]/70 group-hover:text-[#1d1d1f] transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePayment(plan.name, plan.usdPrice)}
                      disabled={loadingPricing}
                      className="w-full py-4 bg-[#1d1d1f] text-white rounded-2xl font-black text-base hover:bg-blue-600 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98] shadow-lg disabled:opacity-50"
                    >
                      Subscribe
                    </button>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-white border-t border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="text-3xl font-black tracking-tighter uppercase text-[#1d1d1f]">House of Extsy</div>
            <div className="font-mono text-[9px] text-[#86868b] uppercase tracking-[0.2em]">Crafting AI-first products globally.</div>
          </div>
          <div className="flex gap-12 text-[12px] font-mono uppercase tracking-widest text-[#86868b]">
            <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="hover:text-blue-600 transition-colors duration-500">Call</Link>
            <Link href="https://api.whatsapp.com/send?phone=918010470077" target="_blank" className="hover:text-blue-600 transition-colors duration-500">WhatsApp</Link>
            <button onClick={() => setShowAbout(true)} className="hover:text-blue-600 transition-colors duration-500">About</button>
          </div>
          <div className="text-[10px] text-black/20 font-mono tracking-widest">© 2026 HOUSE OF EXTSY INC.</div>
        </div>
      </footer>
    </div>
  );
}
