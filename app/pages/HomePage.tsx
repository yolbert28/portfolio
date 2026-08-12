import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { AboutSection } from "../components/AboutSection";
import { CareerSection } from "../components/CareerSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

// Textos que va "tipeando" en bucle.
// Si solo quieres uno fijo (sin loop), deja un único elemento en el array.
const PROFESSIONS = [
  "Full Stack Developer",
  "Mobile Developer",
  "Android & Flutter",
];

const TYPING_SPEED = 90; // ms por caracter al escribir
const DELETING_SPEED = 45; // ms por caracter al borrar
const PAUSE_AFTER_TYPE = 1500; // ms que permanece el texto completo antes de borrar
const PAUSE_AFTER_DELETE = 400; // ms de pausa antes de escribir la siguiente palabra

export default function HomePage() {
  const splineRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fija el alto del hero a window.innerHeight una sola vez al montar.
  // Esto evita que Spline cambie de tamaño al hacer scroll (el valor de
  // 100vh puede cambiar cuando aparece/desaparece la barra de scroll o
  // el chrome del browser).
  const [heroHeight, setHeroHeight] = useState("100vh");
  useEffect(() => {
    setHeroHeight(`${window.innerHeight}px`);
  }, []);

  // Limpieza del timeout si el componente se desmonta a mitad de la animación
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function startTypewriter(spline) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const setProfession = (text) => spline.setVariable("profession", text);

    const tick = () => {
      const currentWord = PROFESSIONS[wordIndex];

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

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % PROFESSIONS.length;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        timeoutRef.current = setTimeout(tick, DELETING_SPEED);
      }
    };

    timeoutRef.current = setTimeout(tick, 400);
  }

  function onLoad(spline) {
    splineRef.current = spline;
    spline.setVariable("profession", "");
    startTypewriter(spline);
  }

  return (
    <>
      <main style={{ height: heroHeight, overflow: "hidden" }}>
        <Spline
          scene="/home.spline"
          style={{ width: "100%", height: heroHeight, background: "transparent" }}
          onLoad={onLoad}
        />
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
