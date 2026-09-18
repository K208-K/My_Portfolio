// ============================================================
// SITE CONFIGURATION — Single source of truth for site metadata
// ============================================================

export const siteConfig = {
  name: "Abdul Karim (Karrim)",
  shortName: "Karrim",
  title: "Karrim — AI/ML Student & Developer",
  description:
    "Portfolio of Abdul Karim (Karrim) — Computer Science & Engineering student at Quantum University specialising in AI, Machine Learning, Data Science, and Full Stack Development.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://karrim.dev",
  github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "K208-K"}`,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/[YOUR_LINKEDIN]",
  email: process.env.CONTACT_EMAIL || "[YOUR_EMAIL@example.com]",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919876543210",
  resumePath: "/resume/resume.pdf",
  cvPath: "/resume/cv.pdf",
  availability: "Open to internships and opportunities",
  lastUpdated: "2026",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Full Stack Developer",
    "Python",
    "Next.js",
    "Computer Science",
    "Quantum University",
    "Karrim",
    "Abdul Karim",
  ],
};

export type SiteConfig = typeof siteConfig;
