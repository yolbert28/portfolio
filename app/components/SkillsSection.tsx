// ─── Datos ────────────────────────────────────────────────────────────────────
// Usa skillicons.dev para íconos estilo "app icon". Edita estos arrays con tus skills.
// Referencia de nombres: https://skillicons.dev

const ROW_1: Skill[] = [
  { name: "Android",         icon: "https://skillicons.dev/icons?i=androidstudio" },
  { name: "Flutter",         icon: "https://skillicons.dev/icons?i=flutter" },
  { name: "Kotlin",          icon: "https://skillicons.dev/icons?i=kotlin" },
  { name: "Dart",            icon: "https://skillicons.dev/icons?i=dart" },
  { name: "Firebase",        icon: "https://skillicons.dev/icons?i=firebase" },
  { name: "Swift",           icon: "https://skillicons.dev/icons?i=swift" },
  { name: "Java",            icon: "https://skillicons.dev/icons?i=java" },
  { name: "Gradle",          icon: "https://skillicons.dev/icons?i=gradle" },
];

const ROW_2: Skill[] = [
  { name: "React",           icon: "https://skillicons.dev/icons?i=react" },
  { name: "TypeScript",      icon: "https://skillicons.dev/icons?i=ts" },
  { name: "Node.js",         icon: "https://skillicons.dev/icons?i=nodejs" },
  { name: "PostgreSQL",      icon: "https://skillicons.dev/icons?i=postgres" },
  { name: "MongoDB",         icon: "https://skillicons.dev/icons?i=mongodb" },
  { name: "Docker",          icon: "https://skillicons.dev/icons?i=docker" },
  { name: "GraphQL",         icon: "https://skillicons.dev/icons?i=graphql" },
  { name: "Express",         icon: "https://skillicons.dev/icons?i=express" },
];

const ROW_3: Skill[] = [
  { name: "Git",             icon: "https://skillicons.dev/icons?i=git" },
  { name: "GitHub",          icon: "https://skillicons.dev/icons?i=github" },
  { name: "GitLab",          icon: "https://skillicons.dev/icons?i=gitlab" },
  { name: "Figma",           icon: "https://skillicons.dev/icons?i=figma" },
  { name: "Linux",           icon: "https://skillicons.dev/icons?i=linux" },
  { name: "Python",          icon: "https://skillicons.dev/icons?i=python" },
  { name: "Redis",           icon: "https://skillicons.dev/icons?i=redis" },
  { name: "Kubernetes",      icon: "https://skillicons.dev/icons?i=kubernetes" },
];

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: string;
}

// ─── Tarjeta de skill ─────────────────────────────────────────────────────────
function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div
      className="flex flex-col items-center gap-2 mx-4 group cursor-default select-none"
      style={{ minWidth: "80px" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center
                   border border-white/8 bg-white/4
                   group-hover:border-purple-500/40 group-hover:bg-white/8
                   group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]
                   transition-all duration-300"
      >
        <img
          src={skill.icon}
          alt={skill.name}
          width={40}
          height={40}
          loading="lazy"
          draggable={false}
          style={{ imageRendering: "auto" }}
        />
      </div>
      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300 whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

// ─── Carrusel infinito ────────────────────────────────────────────────────────
function Marquee({
  skills,
  direction,
  speed = 40,
}: {
  skills: Skill[];
  direction: "left" | "right";
  speed?: number;
}) {
  // Duplicamos para que el bucle sea seamless
  const doubled = [...skills, ...skills];
  const duration = `${speed}s`;

  return (
    <div
      className="overflow-hidden w-full relative"
      // Fades laterales para suavizar los bordes
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div
        className="flex"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${duration} linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────
export function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-24 overflow-hidden">
      {/* Ambient glow center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            width: "700px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-16">
          <p className="text-xs font-mono text-purple-500 tracking-widest mb-3">
            // 02
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Mis Stack{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tecnológicos
            </span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>
      </div>

      {/* ── Carruseles ── */}
      <div className="flex flex-col gap-6">
        {/* Fila 1: → izquierda */}
        <Marquee skills={ROW_1} direction="left"  speed={35} />

        {/* Fila 2: → derecha */}
        <Marquee skills={ROW_2} direction="right" speed={42} />

        {/* Fila 3: → izquierda */}
        <Marquee skills={ROW_3} direction="left"  speed={38} />
      </div>
    </section>
  );
}
