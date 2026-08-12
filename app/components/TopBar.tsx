import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "Sobre mí", href: "#about" },
  { label: "Carrera", href: "#career" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export function TopBar() {
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* Logo + nombre */}
        <a href="#top" className="flex items-center gap-3 group">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white
                       bg-gradient-to-br from-purple-500 to-purple-700
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

        {/* Links centrales */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
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

        {/* CTA */}
        <a
          href="mailto:tuemail@ejemplo.com"
          className="hidden sm:flex items-center gap-2 rounded-full border border-purple-500/40
                     px-4 py-2 text-sm text-gray-100
                     hover:border-purple-400 hover:shadow-[0_0_16px_rgba(168,85,247,0.5)]
                     transition-all duration-300"
        >
          Escríbeme
          <Mail size={14} className="text-purple-400" />
        </a>
      </nav>
    </header>
  );
}
