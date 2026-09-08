import { ExternalLink, Award } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useTranslation } from "react-i18next";
import { CERTIFICATES, type Certificate } from "../data/content";
import { SectionBadge } from "./SectionBadge";
import { Divider } from "./Divider";

// ─── Certificate Card ─────────────────────────────────────────────────────────
function CertificateCard({
  cert,
  index,
  inView,
}: {
  cert: Certificate;
  index: number;
  inView: boolean;
}) {
  const { t } = useTranslation();

  const title = t(`certificates.items.${cert.translationKey}.title`);
  const credentialLabel = t("certificates.show_credential");
  const issuedLabel = t("certificates.issued");
  const credentialIdLabel = t("certificates.credential_id");

  return (
    <div
      className="group relative flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        transitionDelay: `${400 + index * 120}ms`,
      }}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 flex flex-col flex-1 items-center gap-4 text-center">
        {/* Header: logo + title */}
        <div className="flex flex-col items-center gap-3">
          {/* Issuer Logo */}
          <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={cert.issuerLogo}
              alt={cert.issuer}
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-white leading-tight group-hover:text-purple-200 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-purple-300 font-medium mt-0.5">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-col gap-1.5 text-xs text-gray-500 w-full">
          <span>
            <span className="text-gray-400">{issuedLabel}:</span>{" "}
            {cert.issueDate}
          </span>
          <span className="font-mono break-all">
            <span className="text-gray-400">{credentialIdLabel}:</span>{" "}
            <span className="text-gray-300">{cert.credentialId}</span>
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-white border border-white/15 rounded-full px-4 py-2 hover:border-purple-400 hover:text-purple-300 hover:shadow-[0_0_14px_rgba(168,85,247,0.2)] transition-all duration-300"
        >
          <Award size={13} />
          {credentialLabel}
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function CertificatesSection() {
  const { ref, inView } = useInView(0.1);
  const { t } = useTranslation();

  const sectionTitle = t("certificates.title");
  const sectionSubtitle = t("certificates.subtitle");

  return (
    <section
      id="certificates"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 60%)",
          filter: "blur(100px)",
          opacity: 0.08,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-4">
            <SectionBadge inView={inView} number="05" />
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

        {/* CERTIFICATES GRID — 4 uniform columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {CERTIFICATES.map((cert, i) => (
            <CertificateCard
              key={cert.credentialId}
              cert={cert}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
