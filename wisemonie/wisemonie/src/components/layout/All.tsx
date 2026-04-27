"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Brain, Receipt, Wallet } from "lucide-react";

const FEATURE_DURATION = 4000;

/* ── fires once when element enters viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const features = [
  {
    icon: <Wallet size={15} className="text-[#22c55e]" />,
    title: "Smart Budget Tracker",
    description:
      "Track every kobo automatically. Wisemonie categorises your spending in real-time so you always know where your money goes.",
  },
  {
    icon: <Brain size={15} className="text-[#22c55e]" />,
    title: "AI Financial Coach",
    description:
      "Get personalised savings tips and spending insights powered by AI — like having a financial advisor in your pocket.",
  },
  {
    icon: <Receipt size={15} className="text-[#22c55e]" />,
    title: "Automated Bill Reminders",
    description:
      "Never miss a payment. Wisemonie predicts upcoming bills and nudges you before your balance runs low.",
  },
];

const bulletPoints = [
  "Set savings goals in naira and watch AI guide you there — week by week.",
  "Instant spending alerts and weekly AI-generated budget reports delivered to you.",
  "Round-up savings: every transaction automatically saves your spare change.",
];

export default function All() {
  const s1 = useInView();
  const s2 = useInView();

  /* ── auto-scroll feature state ── */
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = (startIdx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let elapsed = 0;
    const tick = 50;

    progressRef.current = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min((elapsed / FEATURE_DURATION) * 100, 100));
    }, tick);

    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % features.length;
        return next;
      });
      elapsed = 0;
      setProgress(0);
    }, FEATURE_DURATION);
  };

  useEffect(() => {
    startCycle(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const handleFeatureClick = (idx: number) => {
    setActiveIdx(idx);
    startCycle(idx);
  };

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-40px); }
          50%  { transform: translateY(40px);  }
          100% { transform: translateY(-40px); }
        }
        @keyframes slideUp {
          0%   { transform: translateY(40px);  }
          50%  { transform: translateY(-40px); }
          100% { transform: translateY(40px);  }
        }
        .phone-slide-down {
          animation: slideDown 5s ease-in-out infinite;
        }
        .phone-slide-up {
          animation: slideUp 5s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-white font-manrope overflow-hidden">

        {/* ══════════════════════════════════════════
            SECTION 1 — About Us
        ══════════════════════════════════════════ */}
        <section
          ref={s1.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* ── Left: chart card in light gray container ── */}
            <div
              className={`relative transition-all duration-700 ease-out ${
                s1.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-14"
              }`}
            >
              <div className="bg-gray-100 rounded-3xl p-6 max-w-sm mx-auto lg:mx-0">
                <div className="bg-[#0a2a2a] rounded-2xl p-5 shadow-xl">
                  <div className="mb-5">
                    <p className="text-white/50 text-xs mb-1 tracking-wide">Saving Month</p>
                    <p className="text-white text-2xl font-bold tracking-tight">₦185,200</p>
                    <p className="text-[#22c55e] text-xs mt-1.5 font-medium">
                      ↑ Increase of <span className="font-bold">12%</span> from last month
                    </p>
                  </div>

                  <div className="relative mt-6">
                    <div className="flex flex-col justify-between h-32 absolute -left-1 top-0">
                      {["60k", "40k", "20k", "0"].map((l) => (
                        <span key={l} className="text-white/25 text-[9px] leading-none">{l}</span>
                      ))}
                    </div>

                    <div className="ml-7 flex items-end gap-2.5 h-32">
                      {[
                        { h: "h-14", month: "April",  active: false, delay: "0ms"   },
                        { h: "h-16", month: "May",    active: false, delay: "100ms" },
                        { h: "h-24", month: "June",   active: true,  delay: "200ms" },
                        { h: "h-20", month: "July",   active: false, delay: "300ms" },
                      ].map((bar) => (
                        <div key={bar.month} className="flex flex-col items-center flex-1">
                          <div className="relative w-full flex items-end justify-center">
                            {bar.active && (
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#22c55e] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-10">
                                ₦60,000
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#22c55e]" />
                              </div>
                            )}
                            <div
                              className={`w-full rounded-t-lg ${bar.h} ${
                                bar.active ? "bg-[#22c55e]" : "bg-white/10"
                              } transition-all duration-700 ease-out`}
                              style={{
                                transformOrigin: "bottom",
                                transform: s1.visible ? "scaleY(1)" : "scaleY(0)",
                                transitionDelay: bar.delay,
                              }}
                            />
                            {bar.active && (
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#22c55e] z-10" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="ml-7 flex gap-2.5 mt-4">
                      {["April", "May", "June", "July"].map((m) => (
                        <span key={m} className="flex-1 text-center text-white/35 text-[9px]">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: text + auto-scrolling features ── */}
            <div
              className={`transition-all duration-700 ease-out delay-150 ${
                s1.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-14"
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                  About Us
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-8">
                ALL YOUR MONEY<br />NEEDS IN ONE APP
              </h2>

              <div className="flex gap-4">
                <div className="flex flex-col items-center pt-1 flex-shrink-0">
                  <div className="relative w-0.5 bg-gray-200 rounded-full flex-1">
                    <div
                      className="absolute left-0 w-0.5 bg-[#22c55e] rounded-full transition-none"
                      style={{
                        top: `${(activeIdx / features.length) * 100}%`,
                        height: `${(1 / features.length) * 100}%`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 w-full bg-[#22c55e] rounded-full"
                        style={{ height: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  {features.map((f, i) => {
                    const isActive = i === activeIdx;
                    return (
                      <button
                        key={f.title}
                        onClick={() => handleFeatureClick(i)}
                        className={`text-left p-4 rounded-xl transition-all duration-400 w-full ${
                          isActive
                            ? "bg-[#ecfccb]"
                            : "bg-transparent border-transparent hover:bg-gray-50"
                        } ${
                          s1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                        style={{ transitionDelay: `${300 + i * 120}ms` }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {f.icon}
                          <h3 className={`font-bold text-sm ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                            {f.title}
                          </h3>
                        </div>
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-gray-500 text-sm leading-relaxed pl-6 pt-1">
                            {f.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — Featured
        ══════════════════════════════════════════ */}
        <section
          ref={s2.ref}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* ── Left: text ── */}
            <div
              className={`transition-all duration-700 ease-out ${
                s2.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-14"
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
                  Featured
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-8">
                ALL THE FEATURES<br />IN ONE APP
              </h2>

              <ul className="flex flex-col gap-4 mb-10">
                {bulletPoints.map((point, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      s2.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${200 + i * 130}ms` }}
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />
                    <p className="text-gray-500 text-sm leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-3 text-gray-900 font-semibold text-sm group">
                <span className="w-9 h-9 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 group-hover:bg-[#16a34a] transition-colors">
                  <ArrowRight size={15} className="text-white" />
                </span>
                <span className="border border-gray-300 group-hover:border-gray-900 transition-colors px-6 py-3 rounded-full">
                  Get Started
                </span>
              </button>
            </div>

            {/* ── Right: two bare phones with opposing scroll animation ── */}
            <div className="max-lg:hidden lg:flex items-center justify-center gap-10 min-h-[520px] overflow-hidden">

              {/* Phone 1 — slides DOWN */}
              <div
                className={`relative w-44 sm:w-52 transition-opacity duration-700 ${
                  s2.visible ? "opacity-100" : "opacity-0"
                } ${s2.visible ? "phone-slide-down" : ""}`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="relative w-full aspect-[9/19]">
                  <Image
                    src="/all1.png"
                    alt="Wisemonie – Budget Overview"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const p = t.parentElement;
                      if (p)
                        p.innerHTML = `<div style="width:100%;height:100%;background:#0a2a2a;border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;"><span style="color:#22c55e;font-size:28px;font-family:Manrope,sans-serif;font-weight:700;">₦</span><span style="color:rgba(255,255,255,0.3);font-size:11px;font-family:Manrope,sans-serif;">all1.png</span></div>`;
                    }}
                  />
                </div>
              </div>

              {/* Phone 2 — slides UP */}
              <div
                className={`relative w-44 sm:w-52 transition-opacity duration-700 ${
                  s2.visible ? "opacity-100" : "opacity-0"
                } ${s2.visible ? "phone-slide-up" : ""}`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="relative w-full aspect-[9/19]">
                  <Image
                    src="/all2.png"
                    alt="Wisemonie – AI Coach"
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const p = t.parentElement;
                      if (p)
                        p.innerHTML = `<div style="width:100%;height:100%;background:#1a3a2a;border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;"><span style="color:#22c55e;font-size:28px;font-family:Manrope,sans-serif;font-weight:700;">₦</span><span style="color:rgba(255,255,255,0.3);font-size:11px;font-family:Manrope,sans-serif;">all2.png</span></div>`;
                    }}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}