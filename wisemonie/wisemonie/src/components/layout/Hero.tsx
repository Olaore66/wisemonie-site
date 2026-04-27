"use client";

import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a2a2a]">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0d5c3a]/40 blur-[120px] pointer-events-none" />
      {/* Subtle bottom-left glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0a3d2a]/30 blur-[100px] pointer-events-none" />

      {/* ── DESKTOP / TABLET HERO ── */}
      <div className="hidden md:flex relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen items-center">
        <div className="w-full grid grid-cols-2 gap-12 items-center pt-20 pb-12">
          {/* Left: Text content */}
          <div className="flex flex-col gap-6">
           

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
              Budget Your {" "}
              <span className="block">Finances With</span>
              <span className="block text-lime-400">Confidence</span>
            </h1>

            {/* Subtext */}
           <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-md">
  Take control of your money with smarter budgeting tools, personalized
  financial planning that help you spend wisely, save better.
</p>

 <button className="group flex items-center gap-0 transition-colors text-white font-semibold text-sm w-fit mb-8">
 
  <span className="bg-green-600 hover:bg-[#166534] transition-colors px-10 py-3 rounded-full">
    Open Account
  </span>

   <span className="w-10 h-10 ml-[-20px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
    <ArrowRight size={20} className="text-[#16a34a]" />
  </span>
</button>

           
          </div>

          {/* Right: Hero image */}
          <div className="relative flex items-center justify-center">
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-[#22c55e]/15 blur-[60px]" />
            </div>

            {/* Hero image placeholder — replace src with /main.png */}
            <div className="relative w-full max-w-md aspect-[4/5]">
              <Image
                src="/w.png"
                alt="Wisemonie App Preview"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                onError={(e) => {
                  // Fallback placeholder if main.png not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border:1px dashed rgba(255,255,255,0.15);border-radius:24px;gap:12px;">
                        <div style="width:64px;height:64px;background:rgba(34,197,94,0.2);border-radius:16px;display:flex;align-items:center;justify-content:center;">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
                        </div>
                        <span style="color:rgba(255,255,255,0.4);font-size:13px;font-family:Manrope,sans-serif;">Place main.png in /public</span>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE HERO ── */}
      <div className="md:hidden relative z-10 flex flex-col min-h-screen px-5 pt-28 pb-10">
        {/* Badge */}
        

        {/* Headline */}
       <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
              Budget Your {" "}
              <span className="block">Finances With</span>
              <span className="block text-lime-400">Confidence</span>
            </h1>


       {/* Subtext */}
           <p className="text-white/60 text-base lg:text-lg leading-relaxed max-w-md">
  Take control of your money with smarter budgeting tools, personalized
  financial planning that help you spend wisely, save better.
</p>

        {/* CTA */}
      <button className="group flex items-center gap-0 transition-colors text-white font-semibold text-sm w-fit mb-8">
 
  <span className="bg-green-600 hover:bg-[#166534] transition-colors px-10 py-3 rounded-full">
    Open Account
  </span>

   <span className="w-10 h-10 ml-[-20px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
    <ArrowRight size={20} className="text-[#16a34a]" />
  </span>
</button>


        {/* Mobile hero image */}
        <div className="relative w-full flex-1 min-h-[280px]">
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-[#22c55e]/15 blur-[50px]" />
          </div>

          <Image
            src="/w.png"
            alt="Wisemonie App Preview"
            fill
            className="object-contain drop-shadow-xl"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border:1px dashed rgba(255,255,255,0.15);border-radius:20px;gap:10px;">
                    <div style="width:48px;height:48px;background:rgba(34,197,94,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
                    </div>
                    <span style="color:rgba(255,255,255,0.4);font-size:12px;font-family:Manrope,sans-serif;">Place main.png in /public</span>
                  </div>
                `;
              }
            }}
          />
        </div>

        {/* Mobile stats */}
       
      </div>

    
    </section>
  );
}