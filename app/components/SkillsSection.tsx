import { SKILLS_ROW_1, SKILLS_ROW_2, SKILLS_ROW_3, type Skill } from "../data/content";
import { useTranslation } from "react-i18next";
import { useInView } from "../hooks/useInView";

// ─── Skill Card ──────────────────────────────────────────────────────────────
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

// ─── Infinite Carousel ────────────────────────────────────────────────────────
function Marquee({
  skills,
  direction,
  speed = 40,
}: {
  skills: Skill[];
  direction: "left" | "right";
  speed?: number;
}) {
  const repeated = [...skills, ...skills, ...skills, ...skills];
  const duration = `${speed}s`;

  return (
    <div
      className="overflow-hidden w-full relative flex"
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
        <div className="flex">
          {repeated.map((skill, i) => (
            <SkillCard key={`block1-${skill.name}-${i}`} skill={skill} />
          ))}
        </div>
        <div className="flex">
          {repeated.map((skill, i) => (
            <SkillCard key={`block2-${skill.name}-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function SkillsSection() {
  const { ref, inView } = useInView(0.2);
  const { t } = useTranslation();

  return (
    <section ref={ref} id="skills" className="relative w-full py-24 overflow-hidden">
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
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-xs font-mono text-purple-500 tracking-widest mb-3">
            // 03
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-center">
            <span className="text-white">{t('skills.title_part1')}</span>{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t('skills.title_part2')}
            </span>
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent" />
        </div>
      </div>

      {/* ── Carousels ── */}
      <div className="flex flex-col gap-6">
        <Marquee skills={SKILLS_ROW_1} direction="left" speed={45} />

        <Marquee skills={SKILLS_ROW_2} direction="right" speed={52} />

        <Marquee skills={SKILLS_ROW_3} direction="left" speed={48} />
      </div>
    </section>
  );
}
