# LabVIEW Interactive Learning Hub

> **An interactive, web-based platform for mastering NI LabVIEW through dynamic lessons, practical examples, and real-time progress tracking.**

## Table of Contents
1. [Key Features](#key-features)  
2. [Technology Stack](#technology-stack)  
3. [Project Structure](#project-structure)  
4. [Getting Started](#getting-started)  
5. [Local Development with Dev Containers](#local-development-with-dev-containers)  
6. [Content Authoring Workflow](#content-authoring-workflow)  
7. [Saving & Restoring Progress](#saving--restoring-progress)  
8. [Contributing](#contributing)  
9. [Roadmap](#roadmap)  
10. [License](#license)  

## Key Features

### 🗂️ Modular Lesson System  
* Lessons authored in Markdown and rendered through a rich-text viewer.  
* Tagged by **topic**, **difficulty** (`beginner | intermediate | advanced`), and **time-to-complete**.  
* End-of-lesson “Knowledge Check” quiz reinforces retention.  

### 📝 Interactive Quizzes  
* Stand-alone quiz bank with difficulty grading.  
* Instant feedback & celebratory toasts on success.  
* Correct answers contribute to badge unlocks.  

### 📊 Comprehensive Dashboard  
* **Statistics** – total minutes learned, streak, lessons finished.  
* **Mastery Progress** – radar chart visualising proficiency by difficulty.  
* **Quiz Performance** – running average & best score.  
* **Gamified Achievements** – shareable badges for milestones.

### 🔍 Examples & Reference Browser  
* Curated LabVIEW best-practice snippets.  
* One-click deep-link to the official *LabVIEW Wiki* for extended reading.

### 💎 Modern UI/UX  
* Responsive SPA built with React & Vite.  
* Tailwind-powered dark / light / system theme stored per user.  
* Smooth page-transition animations & accessible modals.

### 💾 Client-Side Persistence  
* All user state written to `localStorage`; no backend required.  

## Technology Stack

| Layer            | Choice                                                      | Why? |
|------------------|-------------------------------------------------------------|------|
| Framework        | **React 18 + TypeScript**                                   | Mature ecosystem, hooks API, strong typing |
| Build Tool       | **Vite**                                                    | Instant HMR & lightning-fast bundles |
| Styling          | **Tailwind CSS v3**                                         | Utility-first workflow, custom theme via CSS variables |
| Icons            | **Lucide-React**                                            | Consistent, tree-shakable SVG set |
| Markdown Render  | **react-markdown**                                          | Secure MD → JSX with plugin ecosystem |
| State & Storage  | Context API + `localStorage` wrapper                        | Lightweight, offline-first |
| Dev Environment  | **VS Code Dev Containers**                                  | One-click, reproducible setup for contributors |

## Project Structure

```
labview-interactive-hub/
├─ src/
│  ├─ components/        # Feature / page components
│  │   ├─ LessonBrowser.tsx
│  │   ├─ ProgressDashboard.tsx
│  │   └─ ...
│  ├─ ui/                # Reusable atomic UI (Button, Card, Modal)
│  ├─ content/           # Markdown lessons, quizzes, examples, achievements
│  ├─ utils/
│  │   ├─ contentLoader.ts   # Simulated fetch → static imports
│  │   └─ storage.ts         # LocalStorage helpers
│  ├─ types.ts           # Global TypeScript types
│  └─ main.tsx           # SPA entrypoint
├─ public/               # Static assets & index.html
└─ .devcontainer/        # VS Code dev-container definition
```

## Getting Started

### Prerequisites
* **Node ≥ 20** & **npm ≥ 10**  
* **Git**  
* *(Optional)* Docker Desktop if you plan to use dev containers.

### Installation

```bash
git clone https://github.com/your-org/labview-interactive-hub.git
cd labview-interactive-hub
npm install
```

### Run Locally

```bash
npm run dev     # Start Vite + Tailwind in watch mode
```

Navigate to <http://localhost:5173> – hot-reload is enabled.

### Production Build

```bash
npm run build   # Bundles + type-checks
npm run preview # Serves dist/ locally for final smoke test
```

## Local Development with Dev Containers

This repository ships with a pre-built **dev container** (`.devcontainer/devcontainer.json`) that automatically provisions Node LTS, PNPM, and recommended VS Code extensions.  
Open the project in VS Code and choose **“Reopen in Container”** to get an identical environment across all machines.

## Content Authoring Workflow

1. Draft lessons or quizzes in Markdown inside `src/content/lessons/`.  
2. Front-matter fields (`title`, `slug`, `difficulty`, `time`) drive UI metadata.  
3. Run `npm run md:lint` to check links and code fences.  
4. Submit a PR – CI validates type safety & markdown lint.

## Saving & Restoring Progress

User-facing state (`UserProgress`) is serialised to `localStorage` after any mutation.  
On app boot, `storage.load()` hydrates React context, enabling **offline continuity** even after browser refreshes.

Data schema is versioned; migrations run automatically when breaking changes ship.



> Built with ♥ to make graphical programming more accessible. Happy wiring!
