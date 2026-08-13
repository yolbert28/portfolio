import { useTranslation } from "react-i18next";
import { useInView } from "../hooks/useInView";
import { ABOUT_TAGS, CV } from "../data/content";
import { SectionBadge } from "./SectionBadge";
import { Divider } from "./Divider";
import { FileText } from "lucide-react";

function AnimatedHeadline({ inView, HEADLINE_WORDS }: { inView: boolean, HEADLINE_WORDS: string[] }) {
  return (
    <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-tight text-white">
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

export function AboutSection() {
  const { ref, inView } = useInView(0.2);
  const { t } = useTranslation();

  const title = t('about.title');
  const cvLabel = t('about.download_cv');
  const subtitle = t('about.subtitle');
  const viewProjects = t('about.view_projects');
  const headline = t('about.headline', { returnObjects: true }) as string[];
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];
  const stats = t('about.stats', { returnObjects: true }) as { value: string; label: string }[];

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-100 h-100 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.08,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-28 lg:py-36">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-4">
            <SectionBadge inView={inView} number="01" />
            <h2
              className={`text-5xl sm:text-6xl font-bold text-white tracking-tight transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              style={{ transitionDelay: "100ms" }}
            >
              {title}
            </h2>
          </div>

          <p
            className={`text-sm text-gray-400 leading-relaxed max-w-55 sm:text-right transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            {subtitle}
          </p>
        </div>

        <Divider inView={inView} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-6">
          <div className="lg:col-span-7 flex flex-col justify-between gap-12">
            <AnimatedHeadline inView={inView} HEADLINE_WORDS={headline} />

            <div className="flex gap-10 flex-wrap">
              {stats.map(({ value, label }, i) => (
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

          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`text-base text-gray-400 leading-relaxed transition-all duration-700 ease-out ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                  }`}
                style={{ transitionDelay: `${800 + i * 150}ms` }}
              >
                {text}
              </p>
            ))}
            <div>
              <a
                href={CV}
                download
                className={`group flex items-center justify-center w-2/3 gap-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 px-5 py-3 rounded-full transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "1150ms" }}
              >
                {cvLabel}
                <FileText size={14} className="group-hover:scale-110 transition-transform duration-300" />
              </a>

              <div
                className={`flex items-center gap-4 mt-4 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: "1150ms" }}
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
                  {viewProjects}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <div className="h-px flex-1 bg-linear-to-r from-white/15 to-transparent" />
              </div>

            </div>

          </div>
        </div>

        <div className="mt-20 flex flex-wrap gap-3">
          {ABOUT_TAGS.map((tag, i) => (
            <span
              key={tag}
              className={`text-xs font-mono text-gray-500 border border-white/8 rounded-full px-3 py-1 cursor-default
                         hover:text-purple-300 hover:border-purple-500/40
                         transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2.5 scale-95"
                }`}
              style={{ transitionDelay: `${1300 + i * 60}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
