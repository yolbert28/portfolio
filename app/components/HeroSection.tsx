import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const TYPING_SPEED = 90;
const DELETING_SPEED = 45;
const PAUSE_AFTER_TYPE = 1500;
const PAUSE_AFTER_DELETE = 400;

export function HeroSection() {
  const { t } = useTranslation();
  const professions = t("hero.professions", { returnObjects: true }) as string[];

  const professionsRef = useRef(professions);
  useEffect(() => {
    professionsRef.current = professions;
  }, [professions]);

  const [currentText, setCurrentText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentProfessions = professionsRef.current;
      if (!currentProfessions || currentProfessions.length === 0) return;
      if (wordIndex >= currentProfessions.length) wordIndex = 0;
      const currentWord = currentProfessions[wordIndex];

      if (!deleting) {
        charIndex++;
        setCurrentText(currentWord.slice(0, charIndex));
        if (charIndex === currentWord.length) {
          deleting = true;
          timeoutId = setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        timeoutId = setTimeout(tick, TYPING_SPEED);
      } else {
        charIndex--;
        setCurrentText(currentWord.slice(0, charIndex));
        if (charIndex <= 0) {
          charIndex = 0;
          deleting = false;
          wordIndex = (wordIndex + 1) % currentProfessions.length;
          timeoutId = setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        timeoutId = setTimeout(tick, DELETING_SPEED);
      }
    };

    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#08001a] via-[#000000] to-[#000000]">
      <style>{`
        @keyframes blob1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(8vw, -8vh) scale(1.15); }
          66%  { transform: translate(-6vw, 12vh) scale(0.85); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(-8vw, 12vh) scale(1.1); }
          66%  { transform: translate(6vw, -8vh) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes shimmer {
          0%   { opacity: 0.15; }
          50%  { opacity: 0.35; }
          100% { opacity: 0.15; }
        }
      `}</style>

      {/* Background Blobs — more subtle */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "blob1 14s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "blob2 16s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Centered crosshair lines */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.35) 50%, transparent)",
          animation: "shimmer 5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(139,92,246,0.35) 50%, transparent)",
          animation: "shimmer 6s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />

      {/* Concentric circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animation: "shimmer 7s ease-in-out infinite", animationDelay: "0.5s" }}>
        <div className="w-[320px] h-[320px] border border-violet-500/15 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-[520px] h-[520px] border border-violet-600/8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating Geometric Shapes */}

      {/* Triangle — top left */}
      <div className="absolute top-[12%] left-[8%] pointer-events-none" style={{ animation: "blob1 20s ease-in-out infinite" }}>
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
          <polygon points="20,2 38,34 2,34" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      {/* Small triangle — bottom right */}
      <div className="absolute bottom-[18%] right-[9%] pointer-events-none" style={{ animation: "blob2 18s ease-in-out infinite", animationDelay: "2s" }}>
        <svg width="28" height="26" viewBox="0 0 28 26" fill="none">
          <polygon points="14,2 26,24 2,24" stroke="rgba(167,139,250,0.2)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Rotated square (diamond) — top right */}
      <div className="absolute top-[20%] right-[10%] pointer-events-none" style={{ animation: "blob2 22s ease-in-out infinite", animationDelay: "1s" }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="6" width="32" height="32" rx="2" stroke="rgba(124,58,237,0.22)" strokeWidth="1.5" fill="none" transform="rotate(45 22 22)" />
        </svg>
      </div>

      {/* Small square — bottom left */}
      <div className="absolute bottom-[22%] left-[7%] pointer-events-none" style={{ animation: "blob1 24s ease-in-out infinite", animationDelay: "3s" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="2" stroke="rgba(139,92,246,0.18)" strokeWidth="1.5" fill="none" transform="rotate(30 12 12)" />
        </svg>
      </div>

      {/* Hexagon — far right middle */}
      <div className="absolute top-[45%] right-[5%] pointer-events-none" style={{ animation: "blob1 26s ease-in-out infinite", animationDelay: "1.5s" }}>
        <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
          <polygon points="24,2 46,14 46,42 24,54 2,42 2,14" stroke="rgba(167,139,250,0.2)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Small hexagon — left middle */}
      <div className="absolute top-[55%] left-[5%] pointer-events-none" style={{ animation: "blob2 20s ease-in-out infinite", animationDelay: "4s" }}>
        <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
          <polygon points="15,1 29,8.5 29,25.5 15,33 1,25.5 1,8.5" stroke="rgba(124,58,237,0.18)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Plus / cross shape — top center-right */}
      <div className="absolute top-[10%] right-[28%] pointer-events-none" style={{ animation: "shimmer 8s ease-in-out infinite", animationDelay: "2s" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="1" x2="10" y2="19" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
          <line x1="1" y1="10" x2="19" y2="10" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Plus — bottom center-left */}
      <div className="absolute bottom-[15%] left-[28%] pointer-events-none" style={{ animation: "shimmer 9s ease-in-out infinite", animationDelay: "1s" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="8" y1="1" x2="8" y2="15" stroke="rgba(124,58,237,0.25)" strokeWidth="1.5" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="rgba(124,58,237,0.25)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        <h1
          className={`text-5xl sm:text-7xl font-extrabold tracking-tight mb-2 transition-all duration-1000 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ color: "#ffffff" }}
        >
          Yolbert <br className="sm:hidden" />
          <span
            style={{
              color: "#7c3aed",
              textShadow: "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)",
            }}
          >
            Torrealba
          </span>
        </h1>

        <div
          className={`flex items-center text-xl sm:text-3xl font-medium h-12 mt-3 transition-all duration-1000 delay-300 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          style={{ color: "#c4b5fd" }}
        >
          <span className="mr-1">{currentText}</span>
          <span
            className="w-0.5 h-6 sm:h-8 animate-pulse"
            style={{ backgroundColor: "#7c3aed" }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 delay-500 ease-out ${mounted ? "opacity-60" : "opacity-0"}`}
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, #7c3aed, transparent)" }} />
      </div>

      {/* Bottom fade mask — hides hard clip edge smoothly */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #000314)",
        }}
      />
    </section>
  );
}
