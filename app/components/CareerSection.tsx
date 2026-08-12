import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

// ─── Datos de Carrera ─────────────────────────────────────────────────────────
const JOBS = [
  {
    date: "May 2024 — Present",
    location: "Turin, Italy",
    company: "Red Bull",
    role: "Senior Mobile Engineer",
    description:
      "Building mobile apps for the digital signage industry — native APKs and iOS apps that drive screens, posters and embedded displays. Heavy focus on hardware integration: device pairing, provisioning, firmware handshakes and reliable wireless connectivity in the field.",
    tags: ["Kotlin", "Swift", "Bluetooth", "Digital Signage"],
  },
  {
    date: "Jan 2021 — Apr 2024",
    location: "Remote",
    company: "TechNova",
    role: "Full Stack Developer",
    description:
      "Desarrollé aplicaciones financieras seguras y escalables. Lideré la migración de sistemas legacy a una arquitectura moderna de microservicios usando Node.js y React. Implementé paneles de control en tiempo real e integré múltiples APIs bancarias.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    date: "Jun 2019 — Dec 2020",
    location: "Madrid, Spain",
    company: "Startup Hub",
    role: "Frontend Engineer",
    description:
      "Creación de interfaces de usuario interactivas para múltiples startups en etapas iniciales. Fuerte enfoque en animaciones fluidas, accesibilidad y diseño responsivo utilizando las últimas tecnologías web.",
    tags: ["Vue.js", "CSS3", "Figma", "Firebase"],
  },
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
      <span className="text-purple-400 font-bold">02</span>
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

function JobItem({ job, index }: { job: typeof JOBS[0]; index: number }) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 last:mb-0 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Columna Izquierda: Fecha y Ubicación */}
      <div className="md:col-span-3 flex flex-col gap-1.5 mt-1">
        <span className="text-sm font-mono font-bold text-gray-200">
          {job.date}
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1.5">
          <MapPin size={12} className="text-purple-500/70" />
          {job.location}
        </span>
      </div>

      {/* Columna Derecha: Detalles del Puesto */}
      <div className="md:col-span-9 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {job.company}
          </h3>
          <span className="text-sm font-mono text-purple-500 font-medium">
            {job.role}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-gray-400 border border-white/10 rounded-full px-3 py-1 hover:text-white hover:border-purple-500/40 transition-colors duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sección Principal ────────────────────────────────────────────────────────
export function CareerSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="career"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full py-24 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6">
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
              Career
            </h2>
          </div>

          <p
            className="text-sm text-gray-400 leading-relaxed max-w-[280px] sm:text-right"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "200ms",
            }}
          >
            10+ years across signage, fintech, digital health, and early-stage
            startups.
          </p>
        </div>

        {/* DIVIDER */}
        <Divider inView={inView} />

        {/* JOBS LIST */}
        <div className="mt-16">
          {JOBS.map((job, index) => (
            <JobItem key={index} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
