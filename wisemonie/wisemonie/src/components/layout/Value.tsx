"use client";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";

export default function Value() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #021a0e 35%, #043d1c 60%, #0a6632 85%, #0d7a3a 100%)",
        minHeight: "480px",
      }}
    >
      {/* Subtle background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(0,200,100,0.12) 0%, rgba(0,120,60,0.06) 50%, transparent 75%)",
            left: "20%",
            top: "50%",
            transform: "translateY(-50%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(0,180,80,0.10) 0%, transparent 70%)",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col gap-10 py-16">
        {/* Desktop Layout (lg and up): Image left, Text right */}
        <div className="hidden lg:flex flex-row items-center gap-10">
          {/* LEFT: Image for desktop */}
          <div className="flex-1 flex justify-center">
            <div className="relative" style={{ width: "380px", height: "380px" }}>
              <Image
                src="/w.png"
                alt="Phone with card"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority
              />
            </div>
          </div>

          {/* RIGHT: Text content for desktop */}
          <div className="flex-1 flex flex-col items-start gap-5 max-w-lg">
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(0,180,100,0.15)",
                border: "1px solid rgba(0,180,100,0.35)",
                color: "#00c97a",
              }}
            >
              <Shield size={14} />
              Trustworthiness
            </div>

            <h2
              className="font-black uppercase leading-none tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              We Value Your Trust
              <br />
              And Security
            </h2>

            <p
              className="leading-relaxed"
              style={{
                color: "#a0c4a8",
                fontSize: "0.95rem",
                maxWidth: "400px",
              }}
            >
              Our Mission Is To Make Finance More Accessible, Transparent, And
              Secure For Everyone. With Cutting.
            </p>

            <button className="group flex items-center gap-0 transition-colors text-white font-semibold text-sm w-fit">
              <span className="bg-green-600 hover:bg-[#166534] transition-colors px-10 py-3 rounded-full">
                Open Account
              </span>
              <span className="w-10 h-10 ml-[-20px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <ArrowRight size={20} className="text-[#16a34a]" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Layout (below lg): Text → Image → Button */}
        <div className="flex lg:hidden flex-col items-center gap-8">
          {/* Text content for mobile */}
          <div className="flex flex-col items-center text-center gap-5 w-full">
            <div
              className="flex items-center justify-center gap-2 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(0,180,100,0.15)",
                border: "1px solid rgba(0,180,100,0.35)",
                color: "#00c97a",
              }}
            >
              <Shield size={14} />
              Trustworthiness
            </div>

            <h2
              className="font-black uppercase leading-tight tracking-tight text-center"
              style={{
                fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              We Value Your Trust
              <br />
              And Security
            </h2>

            <p
              className="leading-relaxed text-center mx-auto"
              style={{
                color: "#a0c4a8",
                fontSize: "0.9rem",
                maxWidth: "300px",
              }}
            >
              Our Mission Is To Make Finance More Accessible, Transparent, And
              Secure For Everyone. With Cutting.
            </p>
          </div>

          {/* Image for mobile (after text, before button) */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: "280px", height: "280px" }}>
              <Image
                src="/w.png"
                alt="Phone with card"
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority
              />
            </div>
          </div>

          {/* Button for mobile */}
          <button className="group flex items-center gap-0 transition-colors text-white font-semibold text-sm w-fit">
            <span className="bg-green-600 hover:bg-[#166534] transition-colors px-8 py-3 rounded-full">
              Open Account
            </span>
            <span className="w-10 h-10 ml-[-20px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <ArrowRight size={20} className="text-[#16a34a]" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}