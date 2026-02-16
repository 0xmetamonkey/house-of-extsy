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
  const [typedText, setTypedText] = useState("");
  const headline = "Build brands with code and media.";

  useEffect(() => {
    setMounted(true);
    fetchLocalization();

    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(headline.slice(0, i));
      i++;
      if (i > headline.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const fetchLocalization = async () => {
    try {
      let countryCode = "US";
      try {
        const geoRes = await fetch("https://freeipapi.com/api/json");
        if (geoRes.ok) {
          const geo = await geoRes.json();
          countryCode = geo.countryCode || "US";
        }
      } catch (err) {
        try {
          const backupRes = await fetch("https://ipapi.co/json/");
          if (backupRes.ok) {
            const backupGeo = await backupRes.json();
            countryCode = backupGeo.country_code || "US";
          }
        } catch (bErr) { }
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
      alert("Razorpay Key ID missing.");
      return;
    }
    const options = {
      key: keyId,
      amount: amount * 100,
      currency: currency,
      name: "House of Extsy",
      description: `${planName} Subscription`,
      handler: (res: any) => alert("Payment Success! ID: " + res.razorpay_payment_id),
      theme: { color: "#000000" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-blue-500/30 selection:text-white overflow-x-hidden">

      {/* Background Code Lines (Tech Feel) */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none font-mono text-[10px] leading-relaxed p-10 select-none">
        {Array.from({ length: 45 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap overflow-hidden">
            <span className="text-blue-400">const</span> build = <span className="text-yellow-400">await</span> extsy.<span className="text-green-400">deploy</span>({`{ spr: "weekly", ai: true, market: "${geoData?.countryCode || 'GLOBAL'}" }`});
          </div>
        ))}
      </div>

      {/* Blue Glow Spot */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="text-xl font-black tracking-tighter flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          EXTSY <span className="text-blue-500 text-sm font-mono mt-1">_BUILD</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="hidden md:block text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-500">
            [ CALL.INIT ]
          </Link>
          <Link href="https://api.whatsapp.com/send?phone=918010470077" target="_blank" className="px-6 py-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
        <FadeIn>
          <div className="font-mono text-blue-500 mb-8 text-xs tracking-[0.3em] uppercase opacity-70">/ systems.ready_v4</div>
          <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tight mb-10 max-w-5xl mx-auto">
            <span className="text-white">{typedText}</span>
            <span className="inline-block w-1 md:w-2 h-[0.8em] bg-blue-500 ml-2 animate-pulse align-middle" />
          </h1>
          <p className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed mb-16 px-4">
            A confluence of elite engineering and creative media. We deliver high-performance AI builds in weekly sprints.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="#pricing" className="px-12 py-6 bg-white text-black font-black text-lg rounded-full hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-700 shadow-2xl active:scale-95">
              View Builds
            </Link>
            <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="px-12 py-6 bg-white/[0.03] border border-white/10 text-white font-black text-lg rounded-full hover:bg-white/10 transition-all duration-700 active:scale-95">
              Book a Sprint
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Dynamic Pricing Section */}
      <section id="pricing" className="relative z-10 py-40 bg-black/40 backdrop-blur-3xl border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="mb-24 text-center">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Subscribe to Lead.</h2>
              <p className="text-xl text-white/40 max-w-2xl mx-auto">
                Scalable AI engineering. Fixed monthly rates. No technical debt.
              </p>
              {geoData?.countryCode === "IN" && (
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  PPP Pricing Active for India
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PLANS.map((plan, idx) => {
                const price = getPriceData(plan.usdPrice);
                return (
                  <div key={plan.id} className="group relative p-1 rounded-[40px] border border-white/5 bg-transparent hover:border-blue-500/40 transition-all duration-700">
                    <div className="h-full bg-[#0a0a0a] rounded-[36px] p-10 flex flex-col relative overflow-hidden transition-all duration-700 group-hover:bg-[#0c0c0c]">
                      {/* Interactive Dot */}
                      <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-white/10 group-hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]" />

                      <div className="mb-10 relative z-10">
                        <div className="font-mono text-[9px] text-blue-500 mb-4 tracking-[0.4em] uppercase opacity-70">/ BUILD_CONFIG_0{idx + 1}</div>
                        <h3 className="text-3xl font-black mb-4 tracking-tight">{plan.name}</h3>
                        <div className="text-5xl font-black mb-8 tracking-tighter">
                          {loadingPricing ? <span className="opacity-10 animate-pulse text-2xl">---</span> : (
                            <>
                              {price.symbol}{price.amount.toLocaleString()}
                              <span className="text-sm font-mono text-white/30 ml-2">/MO</span>
                            </>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-4 mb-12 relative z-10 flex-grow">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-[14px] font-medium text-white/50 group-hover:text-white/80 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePayment(plan.name, plan.usdPrice)}
                        className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white hover:scale-[1.02] transition-all duration-500 active:scale-95 shadow-xl relative z-10"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-black tracking-tighter uppercase tracking-widest">House of Extsy</div>
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Engineering creative futures.</div>
          </div>
          <div className="flex gap-10 font-mono text-[11px] uppercase tracking-widest text-white/40">
            <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="hover:text-blue-500 transition-colors">Call</Link>
            <Link href="https://api.whatsapp.com/send?phone=918010470077" target="_blank" className="hover:text-blue-500 transition-colors">WhatsApp</Link>
            <span className="hidden md:block">© 2026_VERSION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
