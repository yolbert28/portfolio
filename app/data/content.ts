// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Job {
  translationKey: string;
  tags: string[];
  recommendationLetter?: string;
  companyLink?: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Project {
  translationKey: string;
  image: string;
  tags: string[];
  repoLink?: string;
  demoLink?: string;
}

// ─── Hero Data ────────────────────────────────────────────────────────────────
export const PROFESSIONS = [
  "Full Stack Developer",
  "Mobile Developer",
  "Android & Flutter",
];

// ─── About Data ───────────────────────────────────────────────────────────────
export const ABOUT_TAGS = [
  "Android",
  "Flutter",
  "Kotlin",
  "Dart",
  "Node.js",
  "Odoo",
  "PostgreSQL",
  "Python",
];

// ─── Career Data ──────────────────────────────────────────────────────────────
export const JOBS: Job[] = [
  {
    translationKey: "ricardo_teran",
    tags: ["Python", "JavaScript", "PostgreSQL", "Vim", "Odoo", "SSH", "Docker"],
    recommendationLetter: "/carta_de_recomendacion_ricardoteran.pdf",
    companyLink: "https://www.ricardoteran.net/",
  },
  {
    translationKey: "ucla",
    tags: ["React", "Flutter", "Java", "MySQL", "JavaScript", "LavinMQ", "Golang", "Express"],
  },
];

// ─── Skills Data ──────────────────────────────────────────────────────────────
export const SKILLS_ROW_1: Skill[] = [
  { name: "Android", icon: "https://skillicons.dev/icons?i=androidstudio" },
  { name: "Flutter", icon: "https://skillicons.dev/icons?i=flutter" },
  { name: "Kotlin", icon: "https://skillicons.dev/icons?i=kotlin" },
  { name: "Dart", icon: "https://skillicons.dev/icons?i=dart" },
  { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
  { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
  { name: "Spring boot", icon: "https://skillicons.dev/icons?i=spring" },
];

export const SKILLS_ROW_2: Skill[] = [
  { name: "React", icon: "https://skillicons.dev/icons?i=react" },
  { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
  { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
  { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
  { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
  { name: "NestJS", icon: "https://skillicons.dev/icons?i=nest" },
];

export const SKILLS_ROW_3: Skill[] = [
  { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
  { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
  { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
  { name: "Linux", icon: "https://skillicons.dev/icons?i=linux" },
  { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
  { name: "Go", icon: "https://skillicons.dev/icons?i=golang" },
  { name: "Vim", icon: "https://skillicons.dev/icons?i=vim" },
  { name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
];

// ─── Projects Data ────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    translationKey: "watery",
    image:
      "/watery.jpg",
    tags: ["Kotlin", "Jetpack Compose", "Room"],
    repoLink: "https://github.com/yolbert28/watery",
  },
  {
    translationKey: "portfolio",
    image: "/portfolio.png",
    tags: ["React", "React Router Framework", "TypeScript", "Tailwind CSS", "Vite"],
    repoLink: "https://github.com/yolbert28/portfolio",
  },
  {
    translationKey: "university_bank",
    image:
      "/banco.png",
    tags: ["React", "React Router Framework", "TypeScript", "Tailwind CSS"],
    demoLink: "https://banco-universitario.vercel.app",
    repoLink: "https://github.com/yolbert28/banco-universitario",
  },
];

export const CV = "/curriculum.pdf";

// ─── Contact Information ──────────────────────────────────────────────────────
export const CONTACT = {
  github: "https://github.com/yolbert28",
  linkedin: "https://www.linkedin.com/in/yolbert-torrealba-b724a035a/",
  email: "yolbertdev@gmail.com",
  whatsapp: "+584123113313",
};
