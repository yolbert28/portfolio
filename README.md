<h1 align="center">
  <br/>
  🚀 Yolbert Torrealba — Personal Portfolio
  <br/>
</h1>

<p align="center">
  A modern, full-stack personal portfolio built to showcase my skills, experience, and projects as a Full Stack &amp; Mobile Developer.
  Crafted with performance, internationalization, and visual polish in mind.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/React_Router-8-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## 🎬 Preview

<!-- Replace the path below with your GIF or video file once you have it -->
<!-- Option A — GIF (recommended for GitHub): -->
<!-- ![Portfolio Preview](./docs/preview.gif) -->

<!-- Option B — MP4 video (works on GitHub with HTML): -->
<!-- <video src="./docs/preview.mp4" autoplay loop muted playsinline width="100%"></video> -->

> 📌 **To add a preview:** Record a screen capture of your portfolio, export it as a `.gif` or `.mp4`, place it in a `docs/` folder at the root of this repository, and uncomment the corresponding line above.

---

## ✨ Overview

This is my personal developer portfolio — a **Server-Side Rendered (SSR)** single-page application built with React 19 and React Router v8. It serves as a central hub to present who I am, the technologies I work with, my professional experience, and featured projects I've built.

The site features an interactive **3D hero section** powered by Spline, a **typewriter animation** for dynamic role display, full **bilingual support** (🇺🇸 English / 🇻🇪 Spanish), and a clean, dark-themed design with smooth animations.

---

## 🌐 Live Sections

| Section | Description |
|---|---|
| **Hero** | Animated 3D scene with a typewriter effect showcasing roles |
| **About Me** | Brief bio, key stats, and a downloadable CV |
| **Tech Arsenal** | Visual display of the technologies I work with |
| **Experience** | Professional & academic career timeline |
| **Featured Projects** | Highlighted work with links to demos and source code |
| **Contact** | Call-to-action section to get in touch |

---

## 🛠️ Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI library |
| [React Router](https://reactrouter.com/) | 8 | SSR-enabled routing framework |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type-safe development |
| [Vite](https://vite.dev/) | 8 | Build tool & dev server |

### Styling & UI

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Lucide React](https://lucide.dev/) | latest | Icon library |
| [Spline](https://spline.design/) | 4 | Interactive 3D scenes |

### Internationalization

| Technology | Version | Purpose |
|---|---|---|
| [i18next](https://www.i18next.com/) | 26 | Internationalization framework |
| [react-i18next](https://react.i18next.com/) | 17 | React bindings for i18next |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | 8 | Automatic browser language detection |

### DevOps

| Technology | Purpose |
|---|---|
| [Docker](https://www.docker.com/) | Multi-stage containerized production builds |
| Node.js 24 (Alpine) | Lightweight runtime for production |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [npm](https://www.npmjs.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/yolbert28/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run start
```

---

## 🐳 Docker

The project includes a multi-stage `Dockerfile` optimized for production:

```bash
# Build the image
docker build -t yolbert-portfolio .

# Run the container
docker run -p 3000:3000 yolbert-portfolio
```

The multi-stage build ensures that only the production-necessary files and dependencies are included in the final image, keeping it lean and fast.

---

## 🌍 Internationalization

The portfolio is fully bilingual. Translations are stored in:

```
app/
└── locales/
    ├── en.json   # English
    └── es.json   # Spanish
```

The app detects the user's browser language automatically after hydration and switches accordingly. The default language is **Spanish (ES)**.

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── components/       # Reusable UI components (TopBar, Footer, sections...)
│   ├── data/             # Static content data
│   ├── hooks/            # Custom React hooks
│   ├── locales/          # i18n translation files (en, es)
│   ├── pages/            # Page-level components (HomePage)
│   ├── routes/           # React Router route definitions
│   ├── i18n.ts           # i18next configuration
│   ├── root.tsx          # App shell (HTML, TopBar, layout)
│   └── app.css           # Global styles
├── public/               # Static assets (.spline scenes, images)
├── docs/                 # Documentation assets (preview GIF/video)
├── Dockerfile            # Multi-stage production Docker build
├── react-router.config.ts
├── vite.config.ts
└── tsconfig.json
```
