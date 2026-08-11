import { useEffect, useRef, useState } from "react";

// ─── Datos ────────────────────────────────────────────────────────────────────
const HEADLINE_WORDS = [
  "Soy un ingeniero de",
  "productos móviles que trabaja",
  "en todo el stack completo.",
];

const PARAGRAPHS = [
  "Con más de 3 años de experiencia construyendo apps nativas en Android y Flutter, no me quedo solo en el cliente — también diseño y despliego las APIs, bases de datos y servicios en la nube que las impulsan.",
  "Me obsesiona la experiencia del usuario: cada animación, cada transición y cada milisegundo de tiempo de carga importa. Creo que el mejor software es el que parece invisible.",
];

const STATS = [
  { value: "3+", label: "Años de experiencia" },
  { value: "20+", label: "Proyectos entregados" },
  { value: "5+", label: "Tecnologías dominadas" },
];

// ─── Hook: Intersection Observer ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
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
      <span className="text-purple-400 font-bold">01</span>
    </div>
  );
}

function Divider({ inView }: { inView: boolean }) {
  return (
    <div className="relative h-px w-full my-6 overflow-hidden">
      <div className="absolute inset-0 bg-white/10" />
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        style={{
          width: inView ? "100%" : "0%",
          transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: "300ms",
          opacity: 0.7,
        }}
      />
    </div>
  );
}

function AnimatedHeadline({ inView }: { inView: boolean }) {
  return (
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white">
      {HEADLINE_WORDS.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="block"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(110%)",
              transition:
                "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: `${600 + i * 120}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

function StatItem({
  value,
  label,
  delay,
  inView,
}: {
  value: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-sm text-gray-400 leading-snug">{label}</span>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function AboutSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.08,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-28 lg:py-36">
        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-4">
            <SectionBadge inView={inView} />
            <h2
              className="text-5xl sm:text-6xl font-bold text-white tracking-tight"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "100ms",
              }}
            >
              About
            </h2>
          </div>

          <p
            className="text-sm text-gray-400 leading-relaxed max-w-[220px] sm:text-right"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "200ms",
            }}
          >
            Full-stack de una app moderna — nativa, cross-platform y los
            servicios detrás de ellas.
          </p>
        </div>

        {/* DIVIDER */}
        <Divider inView={inView} />

        {/* BODY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-6">
          {/* Izquierda: headline + stats */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-12">
            <AnimatedHeadline inView={inView} />

            <div className="flex gap-10 flex-wrap">
              {STATS.map(({ value, label }, i) => (
                <StatItem
                  key={label}
                  value={value}
                  label={label}
                  delay={1000 + i * 120}
                  inView={inView}
                />
              ))}
            </div>
          </div>

          {/* Derecha: párrafos + CTA */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {PARAGRAPHS.map((text, i) => (
              <p
                key={i}
                className="text-base text-gray-400 leading-relaxed"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(24px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: `${800 + i * 150}ms`,
                }}
              >
                {text}
              </p>
            ))}

            <div
              className="flex items-center gap-4 mt-4"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "1150ms",
              }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 text-sm font-medium text-white
                           border border-white/15 rounded-full px-5 py-2.5
                           hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]
                           transition-all duration-300"
              >
                Ver proyectos
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            </div>
          </div>
        </div>

        {/* FLOATING TAGS */}
        <div className="mt-20 flex flex-wrap gap-3">
          {[
            "Android",
            "Flutter",
            "Kotlin",
            "Dart",
            "Node.js",
            "Firebase",
            "PostgreSQL",
            "Docker",
          ].map((tag, i) => (
            <span
              key={tag}
              className="text-xs font-mono text-gray-500 border border-white/8 rounded-full px-3 py-1
                         hover:text-purple-300 hover:border-purple-500/40
                         transition-all duration-300 cursor-default"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0) scale(1)"
                  : "translateY(10px) scale(0.95)",
                transition:
                  "opacity 0.5s ease, transform 0.5s ease, color 0.3s, border-color 0.3s",
                transitionDelay: `${1300 + i * 60}ms`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
