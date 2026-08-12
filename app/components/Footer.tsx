import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { useTranslation } from "react-i18next";
import { CONTACT } from "../data/content";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="relative w-full border-t border-white/5 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LOGO & COPYRIGHT */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="text-sm font-semibold text-white">Yolbert Torrealba</span>
            <span className="text-purple-500">.</span>
          </a>
          <p className="text-xs text-gray-500">
            &copy; {year} {t('footer.rights')}
          </p>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex items-center gap-4">
          <SocialLink href={CONTACT.github} icon={<GithubIcon size={18} />} label="GitHub" />
          <SocialLink href={CONTACT.linkedin} icon={<LinkedinIcon size={18} />} label="LinkedIn" />
          <SocialLink href={`mailto:${CONTACT.email}`} icon={<Mail size={18} />} label="Email" />
        </div>

      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-gray-400 border border-white/5 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30 transition-all duration-300 hover:scale-110"
    >
      {icon}
    </a>
  );
}
