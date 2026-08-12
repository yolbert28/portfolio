import { Mail, ArrowRight } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useTranslation } from "react-i18next";
import { SectionBadge } from "./SectionBadge";
import { CONTACT } from "../data/content";

export function ContactSection() {
  const { ref, inView } = useInView(0.2);
  const { t } = useTranslation();

  const headingPart1 = t('contact.heading_part1');
  const headingPart2 = t('contact.heading_part2');
  const description = t('contact.description');
  const buttonLabel = t('contact.button');

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full py-32 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Ambient Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-250 h-75 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* BADGE */}
        <div className="mb-6">
          <SectionBadge inView={inView} number="05" />
        </div>

        {/* TITLE */}
        <h2
          className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            transitionDelay: "150ms",
          }}
        >
          {headingPart1}{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {headingPart2}
          </span>
        </h2>

        {/* SUBTITLE */}
        <p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            transitionDelay: "300ms",
          }}
        >
          {description}
        </p>

        <a
          href={`mailto:${CONTACT.email}`}
          className="group relative flex items-center justify-center gap-3 bg-white text-black font-semibold rounded-full px-8 py-4 overflow-hidden transition-transform hover:scale-105 active:scale-95"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: "500ms",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Mail className="relative z-10 w-5 h-5 group-hover:text-white transition-colors duration-300" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            {buttonLabel}
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
