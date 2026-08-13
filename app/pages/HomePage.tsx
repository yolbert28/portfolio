import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { AboutSection } from "../components/AboutSection";
import { CareerSection } from "../components/CareerSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";

const TYPING_SPEED = 90; // ms per char when typing
const DELETING_SPEED = 45; // ms per char when deleting
const PAUSE_AFTER_TYPE = 1500; // ms to pause after typing a word
const PAUSE_AFTER_DELETE = 400; // ms to pause before typing next word

export default function HomePage() {
  const { t, i18n } = useTranslation();

  const [sceneUrl, setSceneUrl] = useState("/home.spline");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // sm or smaller
      if (width < 768) {
        setSceneUrl("/home_sm.spline");
      }
      // md
      else if (width >= 768 && width < 1024) {
        setSceneUrl("/home_md.spline");
      }
      // lg and above
      else {
        setSceneUrl("/home.spline");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const professions = t('hero.professions', { returnObjects: true }) as string[];
  const professionsRef = useRef(professions);

  // Update the ref whenever the language/professions change so the closure gets the latest
  useEffect(() => {
    professionsRef.current = professions;
  }, [professions]);

  const splineRef = useRef<any>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  // Clear timeout if component unmounts mid-animation
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) { // ← Now we check first
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function startTypewriter(spline: any) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const setProfession = (text: string) => spline.setVariable("profession", text);

    const tick = () => {
      const currentProfessions = professionsRef.current;

      // Ensure wordIndex is valid if the array length ever changes
      if (wordIndex >= currentProfessions.length) {
        wordIndex = 0;
      }

      const currentWord = currentProfessions[wordIndex];

      if (!deleting) {
        charIndex++;
        setProfession(currentWord.slice(0, charIndex));

        if (charIndex === currentWord.length) {
          deleting = true;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        timeoutRef.current = setTimeout(tick, TYPING_SPEED);
      } else {
        charIndex--;
        setProfession(currentWord.slice(0, charIndex));

        if (charIndex <= 0) {
          charIndex = 0;
          deleting = false;
          wordIndex = (wordIndex + 1) % currentProfessions.length;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        timeoutRef.current = setTimeout(tick, DELETING_SPEED);
      }
    };

    timeoutRef.current = setTimeout(tick, 400);
  }

  function onLoad(spline: any) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    splineRef.current = spline;
    spline.setVariable("profession", "");
    startTypewriter(spline);
  }

  return (
    <>
      <main className="bg-linear-to-b from-black to-[#000314]" style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
        <Spline
          scene={sceneUrl}
          style={{ width: "100%", height: "100vh", background: "transparent" }}
          onLoad={onLoad}
        />
        {/* Transparent overlay: blocks interaction with the Spline scene */}
        <div className="absolute inset-0 z-10" aria-hidden="true" />
        {/* ── CV Button ── */}
        {/* <div className="absolute bottom-10 left-10 z-20 animate-[fadeSlideUp_0.8s_ease_1.5s_both]">
          <a
            href={cvHref}
            download
            className="group flex items-center gap-3
                       rounded-full px-5 py-3 text-sm font-medium text-white
                       bg-white/8 backdrop-blur-sm
                       border border-white/15
                       hover:border-purple-400/70 hover:bg-purple-500/15
                       hover:shadow-[0_0_24px_rgba(168,85,247,0.4)]
                       transition-all duration-300 ease-out
                       animate-[floatBtn_3s_ease-in-out_infinite]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30 group-hover:bg-purple-500/40 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-purple-300"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
              {cvLabel}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-purple-400 transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div> */}
      </main>

      <AboutSection />
      <CareerSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
