import { MapPin, FileText, ExternalLink } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useTranslation } from "react-i18next";
import { JOBS, type Job } from "../data/content";
import { SectionBadge } from "./SectionBadge";
import { Divider } from "./Divider";

function JobItem({ job, index }: { job: Job; index: number }) {
  const { ref, inView } = useInView(0.2);
  const { t } = useTranslation();

  const jobData = {
    date: t(`experience.jobs.${job.translationKey}.date`),
    location: t(`experience.jobs.${job.translationKey}.location`),
    company: t(`experience.jobs.${job.translationKey}.company`),
    role: t(`experience.jobs.${job.translationKey}.role`),
    description: t(`experience.jobs.${job.translationKey}.description`),
    recommendationBtn: t('experience.recommendation_letter'),
  };

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
      {/* Left Column: Date and Location */}
      <div className="md:col-span-3 flex flex-col gap-1.5 mt-1">
        <span className="text-sm font-mono font-bold text-gray-200">
          {jobData.date}
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1.5">
          <MapPin size={12} className="text-purple-500/70" />
          {jobData.location}
        </span>
      </div>

      {/* Right Column: Job Details */}
      <div className="md:col-span-9 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          {job.companyLink ? (
            <a
              href={job.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/company inline-flex items-center gap-1.5 text-2xl font-bold text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer"
            >
              {jobData.company}
              <ExternalLink
                size={16}
                className="opacity-50 group-hover/company:opacity-100 group-hover/company:text-purple-400 transition-all duration-300 flex-shrink-0"
              />
            </a>
          ) : (
            <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
              {jobData.company}
            </h3>
          )}
          <span className="text-sm font-mono text-purple-500 font-medium">
            {jobData.role}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl whitespace-pre-line">
          {jobData.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-gray-400 border border-white/10 rounded-full px-3 py-1 hover:text-white hover:border-purple-500/40 transition-colors duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}

          {/* Recommendation Letter (Optional) */}
          {job.recommendationLetter && (
            <a
              href={job.recommendationLetter}
              download
              className="group flex items-center gap-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 px-3 py-3 rounded-full transition-all duration-300 ml-2"
            >
              {jobData.recommendationBtn}
              <FileText size={14} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function CareerSection() {
  const { ref, inView } = useInView(0.1);
  const { t } = useTranslation();

  const sectionTitle = t('experience.title');
  const sectionSubtitle = t('experience.subtitle');

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
            <SectionBadge inView={inView} number="02" />
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
            className="text-sm text-gray-400 leading-relaxed max-w-70 sm:text-right"
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
