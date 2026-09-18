# Karrim AI-Powered Portfolio

Production-quality, responsive, and interactive personal digital identity for **Abdul Karim (Karrim)** — Computer Science & Engineering undergraduate at Quantum University Roorkee specializing in **Artificial Intelligence and Machine Learning**.

Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and a grounded **AI Assistant (Gemini / OpenAI / Local RAG Fallback)** with a full-page scroll-driven 151-frame canvas animation.

---

## 🌟 Key Features

1. **Full-Page Frame-Scrubbing Canvas Animation**
   - High-performance HTML5 canvas mapping the entire scroll height of the website to a sequence of 151 preloaded image frames.
   - Hardware-accelerated RAF render loop with linear interpolation (lerp = 0.15) for silky inertia.

2. **Grounded AI Assistant ("KARRIM AI")**
   - Interactive widget on the home page and full-screen `/ai-assistant` experience.
   - Grounded strictly in verified portfolio facts from `/data/` — zero hallucinations.
   - Tri-provider fallback:
     1. Google Gemini 1.5 (`GEMINI_API_KEY`)
     2. OpenAI GPT-4o-mini (`OPENAI_API_KEY`)
     3. Local deterministic grounded RAG engine (works with zero API keys).

3. **Simulated Developer Terminal (`/terminal`)**
   - Interactive bash-like portfolio CLI with command history, autocomplete, up/down arrow navigation.
   - Built-in commands: `help`, `whoami`, `about`, `academic`, `skills`, `projects`, `project <slug>`, `learning`, `resume`, `cv`, `github`, `linkedin`, `contact`, `clear`.

4. **Dynamic Projects System & Case Studies**
   - Categorized project hub (`/projects`) with live search, domain filters, and sorting.
   - Dynamic category pages (`/projects/[category]`).
   - In-depth project case studies (`/projects/[category]/[slug]`) with conditional rendering for architecture, dataset, methodology, metrics, and challenges.

5. **Single Source of Truth Data Layer**
   - All profile details, academic records, skills, and projects live in `src/data/`.
   - Clear placeholders marked for real metrics and details without any fabricated personal info.

6. **Professional Document Viewer (`/resume`)**
   - Tabbed viewer for Resume and Curriculum Vitae with PDF embedding and direct download actions.

7. **Global Command Palette Search (`Ctrl + K` or `/`)**
   - Fast modal search across projects, skills, academic history, and learning roadmap.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS custom scrollbars
- **Smooth Scroll**: Lenis
- **Animations**: Framer Motion & HTML5 Canvas API
- **Icons**: Lucide React
- **AI Integration**: `@google/generative-ai`, `openai`, local retrieval engine

---

## 📁 Architecture & File Structure

```text
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Landing page with full-page scroll canvas
│   │   ├── about/page.tsx               # Bio, interests, philosophy
│   │   ├── academic/page.tsx            # Academic timeline & credentials
│   │   ├── skills/page.tsx              # Skills matrix with qualitative proficiency
│   │   ├── projects/
│   │   │   ├── page.tsx                 # Projects hub with search & filters
│   │   │   └── [category]/
│   │   │       ├── page.tsx             # Category project view
│   │   │       └── [slug]/page.tsx      # Comprehensive case study
│   │   ├── learning/page.tsx            # Learning roadmap (Completed, Current, Next)
│   │   ├── ai-assistant/page.tsx        # Full-screen Karrim AI chat
│   │   ├── terminal/page.tsx            # Simulated developer CLI
│   │   ├── resume/page.tsx              # Resume & CV viewer
│   │   ├── contact/page.tsx             # Contact form & social connections
│   │   ├── api/chat/route.ts            # Grounded AI chat endpoint with rate limiting
│   │   ├── sitemap.ts                   # Dynamic SEO sitemap
│   │   ├── robots.ts                    # SEO robots rules
│   │   └── layout.tsx                   # Global layout with Canvas, Navbar, Footer
│   │
│   ├── components/
│   │   ├── global/                      # Navbar, Footer, FullPageScrollCanvas, Search
│   │   ├── home/                        # Hero, QuickProfile, FeaturedProjects, AIWidget, TerminalPreview, ResumeCards
│   │   └── projects/                    # ProjectHubClient
│   │
│   ├── data/                            # Single Source of Truth
│   │   ├── profile.ts
│   │   ├── education.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── learning.ts
│   │   └── socials.ts
│   │
│   ├── config/
│   │   ├── site.ts
│   │   └── navigation.ts
│   │
│   └── lib/ai/                          # Grounded AI subsystem
│       ├── knowledge.ts
│       ├── prompts.ts
│       ├── retrieval.ts
│       └── response.ts
│
└── public/
    ├── img/                             # 151 scroll animation frames
    └── resume/                          # resume.pdf, cv.pdf
```

---

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/K208-K/portfolio-website.git
cd portfolio-website
npm install
```

### 2. Environment Variables

Create `.env.local` in the root directory:

```env
# Optional AI API Keys (Local grounded fallback works if unset)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Public Info
NEXT_PUBLIC_GITHUB_USERNAME=K208-K
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/YOUR_LINKEDIN_HANDLE
CONTACT_EMAIL=your.email@example.com
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

```bash
npm run build
npm run start
```

---

## 📝 Updating Personal Information

All personal information is strictly decoupled from the UI. To customize:

- **Bio & Socials**: Edit `src/data/profile.ts` and `src/data/socials.ts`.
- **Education**: Edit `src/data/education.ts`.
- **Skills**: Edit `src/data/skills.ts`.
- **Projects**: Add or edit objects in `src/data/projects.ts`. The project will automatically reflect across the Project Hub, Category pages, Case Studies, Search, and AI assistant.
- **Learning Goals**: Update `src/data/learning.ts`.

---

## 🛡️ License

MIT License. Designed and built by Abdul Karim (Karrim).
# My_Portfolio
