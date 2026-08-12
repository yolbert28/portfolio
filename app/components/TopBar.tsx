import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Mail, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CONTACT } from "../data/content";

const NAV_LINKS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#career" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
];

export function TopBar() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  const contactLabel = t('topbar.contact');
  const navItems = NAV_LINKS.map(({ key, href }) => ({ label: t(key), href }));

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);

      // Find which section is active based on scroll
      let currentSection = "";
      for (const link of NAV_LINKS) {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section passed one third of the screen (approx)
          if (rect.top <= window.innerHeight / 2) {
            currentSection = link.href;
          }
        }
      }

      if (currentSection) {
        setActive(currentSection);
      } else if (window.scrollY < 200) {
        // When we are at the Hero (before the first link)
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // call once to initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActive(href);
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled
        ? "bg-black/70 backdrop-blur-md border-b border-white/10"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo + name */}
        <a href="#top" className="flex items-center gap-3 group">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white
                       bg-linear-to-br from-purple-500 to-purple-700
                       shadow-[0_0_12px_rgba(168,85,247,0.6)]
                       group-hover:shadow-[0_0_20px_rgba(168,85,247,0.9)]
                       transition-shadow duration-300"
          >
            YT
          </span>
          <span className="text-sm font-medium text-gray-100">
            Yolbert Torrealba
            <span className="text-purple-400">.</span>
          </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleClick(href)}
                  className={`relative text-sm transition-colors duration-200 ${isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-purple-400 transition-all duration-300 ${isActive
                      ? "w-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      : "w-0"
                      }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-white/10
                       px-3 py-1.5 text-xs text-gray-400 hover:text-white
                       hover:border-white/30 hover:bg-white/5
                       transition-all duration-300"
          >
            <Globe size={14} />
            <span className="font-mono uppercase">{i18n.language.substring(0, 2)}</span>
          </button>
          <a
            href={`mailto:${CONTACT.email}`}
            className="hidden sm:flex items-center gap-2 rounded-full border border-purple-500/40
                       px-4 py-2 text-sm text-gray-100
                       hover:border-purple-400 hover:shadow-[0_0_16px_rgba(168,85,247,0.5)]
                       transition-all duration-300"
          >
            {contactLabel}
            <Mail size={14} className="text-purple-400" />
          </a>
        </div>
      </nav>
    </header>
  );
}
