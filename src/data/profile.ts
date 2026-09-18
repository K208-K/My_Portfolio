// ============================================================
// SINGLE SOURCE OF TRUTH — Profile
// Update this file with real information.
// Placeholders are marked with [PLACEHOLDER].
// ============================================================

export const profile = {
  name: "Abdul Karim",
  nickname: "Karrim",
  title: "AI/ML Student & Developer",
  tagline: "Building intelligent, data-driven and software solutions.",
  shortBio:
    "Computer Science & Engineering undergraduate at Quantum University Roorkee, specialising in Artificial Intelligence and Machine Learning. Passionate about building real-world AI applications, from data pipelines to intelligent web systems.",
  longBio: `I'm a Computer Science & Engineering student at Quantum University Roorkee with a deep focus on Artificial Intelligence and Machine Learning. My journey started with curiosity about how data can uncover insights and how intelligent systems can automate complex decisions.

Over the course of my studies, I've built projects spanning machine learning, deep learning, generative AI, data analytics, and full-stack development. I believe that strong engineers don't just use AI tools — they understand the mathematics, the data pipelines, and the deployment infrastructure beneath them.

I'm currently working towards becoming a complete AI/ML engineer who can take a problem from raw data to a deployed, intelligent application.`,

  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Data Science",
    "Data Analytics",
    "Full Stack Development",
    "Software Engineering",
  ],

  careerDirection:
    "I aim to work as an AI/ML Engineer or Data Scientist at a company solving meaningful problems with data and intelligent systems. I am interested in roles involving model development, MLOps, AI product development, and applied research.",

  philosophy:
    "I believe in learning by building. Every project teaches more than any course. I prefer to understand concepts deeply before applying tools, and I value clean, maintainable code over quick solutions.",

  // [PLACEHOLDER] — Replace with real availability status
  availability: "Open to internships and opportunities",

  // [PLACEHOLDER] — Replace with real location
  location: "Roorkee, Uttarakhand, India",

  // [PLACEHOLDER] — Replace with real email
  email: "[YOUR_EMAIL@example.com]",

  // Update below with real URLs
  github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "K208-K"}`,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/[YOUR_LINKEDIN]",
  
  // Legacy single file fallback:
  resumePath: "/resume/Abdul_Karim_Resume.pdf",
  cvPath: "/resume/Abdul_Karim_CV.pdf",

  // 3-Domain Document Mapping:
  documents: {
    ai_ml: {
      resume: "/resume/Abdul_Karim_AIML_Resume.pdf",
      cv: "/resume/Abdul_Karim_AIML_CV.pdf",
    },
    software_dev: {
      resume: "/resume/Abdul_Karim_SoftwareDev_Resume.pdf",
      cv: "/resume/Abdul_Karim_SoftwareDev_CV.pdf",
    },
    data_analyst: {
      resume: "/resume/Abdul_Karim_DataAnalyst_Resume.pdf",
      cv: "/resume/Abdul_Karim_DataAnalyst_CV.pdf",
    }
  }
};

export type Profile = typeof profile;
