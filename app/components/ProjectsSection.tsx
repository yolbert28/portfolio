import { ExternalLink } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { GithubIcon } from "./SocialIcons";
import { useTranslation } from "react-i18next";
import { PROJECTS, type Project } from "../data/content";
import { SectionBadge } from "./SectionBadge";
import { Divider } from "./Divider";
import { CONTACT } from "../data/content";

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const { t } = useTranslation();

  const projectData = {
    title: t(`projects.items.${project.translationKey}.title`, { defaultValue: project.translationKey }),
    description: t(`projects.items.${project.translationKey}.description`),
    demoLabel: t('projects.demo'),
    codeLabel: t('projects.code'),
  };

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
      {/* Project image */}
      <div className="relative w-full h-48 overflow-hidden bg-black/50">
        <img
          src={project.image}
          alt={projectData.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#000314] to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative p-6 flex flex-col flex-1 z-20">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {projectData.title}
        </h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">
          {projectData.description}
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

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto">
          {project.demoLink && (<a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-400 transition-colors"
          >
            <ExternalLink size={16} />
            <span>{projectData.demoLabel}</span>
          </a>)}
          {project.repoLink && (<a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <GithubIcon size={16} />
            <span>{projectData.codeLabel}</span>
          </a>)}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { ref, inView } = useInView(0.1);
  const { t } = useTranslation();

  const sectionTitle = t('projects.title');
  const sectionSubtitle = t('projects.subtitle');
  const viewMoreLabel = t('projects.view_more');

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full opacity-10"
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
            <SectionBadge inView={inView} number="04" />
            <h2
              className="text-5xl sm:text-6xl font-bold text-white tracking-tight"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "100ms",
              }}
            >
              {sectionTitle}
            </h2>
          </div>

          <p
            className="text-sm text-gray-400 leading-relaxed max-w-60 sm:text-right"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: "200ms",
            }}
          >
            {sectionSubtitle}
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
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-medium text-white
                       border border-white/15 rounded-full px-6 py-3
                       hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]
                       transition-all duration-300"
          >
            <GithubIcon size={18} />
            {viewMoreLabel}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
