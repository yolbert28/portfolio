import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

// ─── Datos de Proyectos ───────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "E-Commerce Mobile App",
    description:
      "Una aplicación móvil nativa con carrito de compras, pasarela de pagos integrada y notificaciones en tiempo real.",
    image:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop",
    tags: ["Flutter", "Firebase", "Stripe"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    title: "Financial Dashboard API",
    description:
      "Backend de alto rendimiento para análisis financiero. Arquitectura de microservicios con websockets para datos en vivo.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    title: "Crypto Tracker UI",
    description:
      "Interfaz de usuario responsiva con gráficos interactivos y actualizaciones en tiempo real de mercados de criptomonedas.",
    image:
      "https://images.unsplash.com/photo-1605792657360-d6211bc3f693?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    demoLink: "#",
    repoLink: "#",
  },
];

// ─── Hook: Intersection Observer ──────────────────────────────────────────────
function useInView(threshold = 0.1) {
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
      <span className="text-purple-400 font-bold">04</span>
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

function ProjectCard({ project, index, inView }: { project: any; index: number; inView: boolean }) {
  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 transition-colors duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        transitionDelay: `${600 + index * 150}ms`,
      }}
    >
      {/* Imagen del proyecto */}
      <div className="relative w-full h-48 overflow-hidden bg-black/50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000314] to-transparent opacity-80" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-purple-200 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Enlaces */}
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-400 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <GithubIcon size={16} />
            <span>Código</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Sección Principal ────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

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
              Proyectos
            </h2>
          </div>

          <p
            className="text-sm text-gray-400 leading-relaxed max-w-[240px] sm:text-right"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "200ms",
            }}
          >
            Una selección de trabajos recientes, combinando diseño moderno con arquitecturas robustas.
          </p>
        </div>

        {/* DIVIDER */}
        <Divider inView={inView} />

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* VIEW MORE CTA */}
        <div
          className="flex justify-center mt-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "1000ms",
          }}
        >
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-medium text-white
                       border border-white/15 rounded-full px-6 py-3
                       hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]
                       transition-all duration-300"
          >
            <GithubIcon size={18} />
            Ver más en GitHub
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
