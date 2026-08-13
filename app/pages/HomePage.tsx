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
