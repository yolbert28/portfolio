import { useEffect, useRef, useState } from "react";
import { Mail, Send, ArrowRight } from "lucide-react";

// ─── Hook: Intersection Observer ──────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────
function SectionBadge({ inView }: { inView: boolean }) {
  return (
    <div
      className="flex items-center gap-2 text-xs font-mono tracking-widest"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: "0ms",
      }}
    >
      <span className="text-purple-500 select-none">//</span>
      <span className="text-purple-400 font-bold">05</span>
    </div>
  );
}

// ─── Sección Principal ────────────────────────────────────────────────────────
export function ContactSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full py-32 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Ambient Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* BADGE */}
        <div className="mb-6">
          <SectionBadge inView={inView} />
        </div>

        {/* TÍTULO */}
        <h2
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            transitionDelay: "150ms",
          }}
        >
          Trabajemos{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Juntos
          </span>
        </h2>

        {/* SUBTÍTULO */}
        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            transitionDelay: "300ms",
          }}
        >
          Ya sea que tengas un proyecto en mente, busques un desarrollador para tu equipo, o simplemente quieras saludar. Mi bandeja de entrada siempre está abierta.
        </p>

        {/* BOTÓN CTA */}
        <a
          href="mailto:tuemail@ejemplo.com"
          className="group relative flex items-center justify-center gap-3 bg-white text-black font-semibold rounded-full px-8 py-4 overflow-hidden transition-transform hover:scale-105 active:scale-95"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "500ms",
          }}
        >
          {/* Fondo gradiente hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Mail className="relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Dí Hola
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
