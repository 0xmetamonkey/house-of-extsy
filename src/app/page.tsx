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

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = (planName: string, amount: number) => {
    console.log("Initiating payment for:", planName, amount);

    if (typeof window === "undefined" || !window.Razorpay) {
      console.error("Razorpay SDK not found on window");
      alert("Razorpay SDK not loaded. Please try again later.");
      return;
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!keyId || keyId === "rzp_test_placeholder") {
      alert("Razorpay Key ID is not configured correctly in .env.local");
      return;
    }

    const options = {
      key: keyId,
      amount: amount * 100,
      currency: "USD",
      name: "House of Extsy",
      description: `${planName} Subscription`,
      image: "/extsy-e-logo.png",
      handler: function (response: any) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout modal closed");
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#1d1d1f",
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error opening Razorpay modal:", err);
      alert("Could not open payment window. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f] flex flex-col selection:bg-black/5 selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 glass-card w-[90%] max-w-7xl border-white/20">
        <Link href="/" className="hover:scale-105 transition-transform duration-500">
          <Image src="/extsy-e-logo.png" alt="House of Extsy" width={100} height={100} className="h-12 w-auto" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="hidden md:block text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-500">
            Book a call
          </Link>
          <Link href="#pricing" className="px-6 py-2.5 text-[13px] font-semibold bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-all duration-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] active:scale-95">
            Explore Pricing
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-white to-[#fafafa]">
        <LiquidBlobs />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <FadeIn>
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-black/5 blur-3xl rounded-full scale-150 opacity-20" />
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
            <h1 className="text-5xl md:text-8xl font-black mb-12 hero-text leading-[0.85] tracking-tight text-[#1d1d1f]">
              Elite branding.<br />Delivered daily.
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link
                href="https://calendly.com/extsystudios/30min"
                target="_blank"
                className="w-full sm:w-auto px-12 py-6 bg-[#1d1d1f] text-white rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 active:scale-95"
              >
                Book a Discovery Call
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
      <section id="pricing" className="py-40 px-6 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black text-[#1d1d1f] tracking-tight mb-6">Simple, daily branding.</h2>
              <p className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto">Unlimited requests. Two-day delivery. One flat monthly rate.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Standard Plan */}
              <div className="glass-card p-14 bg-white/40 group hover:bg-[#1d1d1f] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 border-black/5">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#86868b] group-hover:text-white/40 mb-3 transition-colors duration-500">Standard</div>
                <div className="text-5xl font-black text-[#1d1d1f] group-hover:text-white mb-10 transition-colors duration-500 tracking-tight">$4,995<span className="text-base font-medium text-[#86868b] group-hover:text-white/40 ml-2">/mo</span></div>
                <button
                  onClick={() => handlePayment("Standard", 4995)}
                  className="w-full py-5 bg-[#1d1d1f] text-white group-hover:bg-white group-hover:text-[#1d1d1f] rounded-full font-bold text-lg transition-all duration-500 active:scale-[0.98] shadow-xl hover:shadow-2xl"
                >
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="glass-card p-14 bg-[#1d1d1f]/[0.02] border-black/10 group hover:bg-[#1d1d1f] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 overflow-hidden relative">
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/[0.05] group-hover:bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1d1d1f] group-hover:text-white transition-colors duration-500">Popular</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#86868b] group-hover:text-white/40 mb-3 transition-colors duration-500">Pro</div>
                <div className="text-5xl font-black text-[#1d1d1f] group-hover:text-white mb-10 transition-colors duration-500 tracking-tight">$6,995<span className="text-base font-medium text-[#86868b] group-hover:text-white/40 ml-2">/mo</span></div>
                <button
                  onClick={() => handlePayment("Pro", 6995)}
                  className="w-full py-5 bg-[#1d1d1f] text-white group-hover:bg-white group-hover:text-[#1d1d1f] rounded-full font-bold text-lg transition-all duration-500 active:scale-[0.98] shadow-xl hover:shadow-2xl"
                >
                  Get Started
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-[#fafafa] border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-black tracking-tighter uppercase text-[#1d1d1f]">House of Extsy</div>
          <div className="flex gap-10 text-[14px] font-medium text-[#86868b]">
            <Link href="https://calendly.com/extsystudios/30min" target="_blank" className="hover:text-[#1d1d1f] transition-colors duration-500">Book a call</Link>
            <Link href="https://api.whatsapp.com/send?phone=918010470077" target="_blank" className="hover:text-[#1d1d1f] transition-colors duration-500">WhatsApp</Link>
            <span className="text-black/20 font-normal">© 2026 HOUSE OF EXTSY INC.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
