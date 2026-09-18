import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./prompts";
import { retrieveContext } from "./retrieval";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { learningItems } from "@/data/learning";

export interface AIResponse {
  answer: string;
  provider: "gemini" | "openai" | "grounded-fallback";
  sources?: string[];
}

/**
 * Local deterministic grounded fallback when no AI API key is configured.
 * Strictly avoids hallucination and uses only verified portfolio data.
 */
export function generateLocalFallback(query: string): string {
  const q = query.toLowerCase().trim();

  // Negative checks: employment, companies, fake info
  if (
    q.includes("company") ||
    q.includes("work for") ||
    q.includes("salary") ||
    q.includes("internship") ||
    q.includes("job experience") ||
    q.includes("employed")
  ) {
    return `I don't have that information in Karrim's portfolio. Karrim is currently a full-time Computer Science & Engineering student specializing in AI/ML at Quantum University, and is open to internships and new opportunities. You can check his [Resume](/resume) or [Contact](/contact) him directly.`;
  }

  // Who is Karrim / Studies
  if (
    q.includes("who is") ||
    q.includes("about") ||
    q.includes("what does karrim study") ||
    q.includes("study") ||
    q.includes("college") ||
    q.includes("university")
  ) {
    return `**Abdul Karim (Karrim)** is a Computer Science & Engineering undergraduate at **Quantum University, Roorkee**, specializing in **Artificial Intelligence and Machine Learning**.\n\nHe focuses on building intelligent, data-driven software solutions spanning machine learning, deep learning, and modern web applications.\n\nExplore more on his [About Page](/about) or view his [Academic Journey](/academic).`;
  }

  // Skills
  if (q.includes("skill") || q.includes("tech stack") || q.includes("technolog")) {
    const topSkills = skillCategories
      .map(
        (c) =>
          `• **${c.label}**: ${c.skills
            .slice(0, 4)
            .map((s) => `${s.name}`)
            .join(", ")}`
      )
      .join("\n");
    return `Here is an overview of Karrim's technical skill categories:\n\n${topSkills}\n\nFor a full breakdown of proficiency levels without fake percentages, visit the [Skills Page](/skills).`;
  }

  // Specific ML Projects / What projects has Karrim built?
  if (q.includes("project") || q.includes("ml project") || q.includes("built")) {
    const projectList = projects
      .map(
        (p) =>
          `• **[${p.title}](/projects/${p.category}/${p.slug})** (${p.categoryLabel}) — ${p.description}`
      )
      .join("\n\n");
    return `Here are some of the key projects Karrim has developed:\n\n${projectList}\n\nYou can explore all case studies, filter by domain, or search projects on the [Projects Hub](/projects).`;
  }

  // House Price Prediction specific
  if (q.includes("house price")) {
    const hp = projects.find((p) => p.slug === "house-price-prediction");
    if (hp) {
      return `**${hp.title}** is a regression-based machine learning project that predicts property prices based on real estate attributes. Key technologies: ${hp.technologies.join(
        ", "
      )}.\n\nRead the full case study: [View House Price Prediction Case Study](/projects/${hp.category}/${hp.slug}).`;
    }
  }

  // Heart Attack Prediction specific
  if (q.includes("heart")) {
    const hp = projects.find((p) => p.slug === "heart-attack-prediction");
    if (hp) {
      return `**${hp.title}** is an end-to-end classification system using Random Forest to predict cardiac risk from clinical parameters, deployed with a Flask API and React frontend.\n\nRead the full case study: [View Heart Attack Prediction Case Study](/projects/${hp.category}/${hp.slug}).`;
    }
  }

  // OCR / Captcha specific
  if (q.includes("ocr") || q.includes("captcha")) {
    const ocr = projects.find((p) => p.slug === "ocr-captcha");
    if (ocr) {
      return `**${ocr.title}** is a deep learning OCR pipeline using CNNs for feature extraction, RNNs for sequence modeling, and CTC loss for alignment-free CAPTCHA reading.\n\nRead the full case study: [View OCR CAPTCHA Case Study](/projects/${ocr.category}/${ocr.slug}).`;
    }
  }

  // What is Karrim currently learning?
  if (q.includes("learn") || q.includes("currently learning") || q.includes("grow")) {
    const current = learningItems
      .filter((l) => l.status === "In Progress")
      .map((l) => `• **${l.topic}** (${l.area}): ${l.description}`)
      .join("\n");
    const next = learningItems
      .filter((l) => l.status === "Next Goal")
      .slice(0, 2)
      .map((l) => `• **${l.topic}** (${l.area})`)
      .join("\n");

    return `Karrim is currently actively learning:\n\n${current}\n\n**Upcoming Goals:**\n${next}\n\nFollow his complete learning roadmap on the [Learning Journey](/learning) page.`;
  }

  // Contact / Hire
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire")) {
    return `You can reach out to Karrim directly:\n- **Contact Form**: [Contact Page](/contact)\n- **GitHub**: [${profile.github}](${profile.github})\n- **LinkedIn**: [${profile.linkedin}](${profile.linkedin})\n- **Status**: ${profile.availability}`;
  }

  // Resume / CV
  if (q.includes("resume") || q.includes("cv")) {
    return `You can view and download Karrim's professional documents on the [Resume & CV Viewer](/resume). Both PDF preview and direct download options are available.`;
  }

  // Terminal
  if (q.includes("terminal") || q.includes("cli")) {
    return `You can explore Karrim's portfolio using an interactive simulated developer terminal at [/terminal](/terminal). Type \`help\` once inside to view available commands!`;
  }

  // Default helpful response
  return `I am Karrim's portfolio assistant. I can answer questions about Karrim's:\n- Academic background at Quantum University ([Academic](/academic))\n- Technical skills in AI/ML, Python, and Full Stack ([Skills](/skills))\n- Project case studies including Heart Attack Prediction, House Price Regression, and OCR CAPTCHA ([Projects](/projects))\n- Current learning roadmap ([Learning](/learning))\n- Resume & CV ([Resume](/resume))\n\nHow can I help you?`;
}

/**
 * Orchestrates response generation across Gemini, OpenAI, or Local Grounded Fallback.
 */
export async function generatePortfolioResponse(
  message: string,
  chatHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<AIResponse> {
  const sanitized = message.trim().slice(0, 1000); // Input length limit
  if (!sanitized) {
    return {
      answer: "Please ask a question about Karrim's portfolio, skills, or projects.",
      provider: "grounded-fallback",
    };
  }

  const { relevantContext, matchedCategories } = retrieveContext(sanitized);

  // 1. Google Gemini Provider
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `${SYSTEM_PROMPT}\n\nVERIFIED PORTFOLIO DATA:\n${relevantContext}`,
      });

      const contents = chatHistory.slice(-4).map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      }));

      contents.push({
        role: "user",
        parts: [{ text: sanitized }],
      });

      const result = await model.generateContent({ contents });
      const text = result.response.text();

      return {
        answer: text,
        provider: "gemini",
        sources: matchedCategories,
      };
    } catch (err) {
      console.warn("Gemini API error, falling back to next provider:", err);
    }
  }

  // 2. OpenAI Provider
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\nVERIFIED PORTFOLIO DATA:\n${relevantContext}`,
          },
          ...chatHistory.slice(-4).map((h) => ({
            role: h.role as "user" | "assistant",
            content: h.content,
          })),
          { role: "user", content: sanitized },
        ],
        max_tokens: 600,
        temperature: 0.3,
      });

      const text = completion.choices[0]?.message?.content || "";
      if (text) {
        return {
          answer: text,
          provider: "openai",
          sources: matchedCategories,
        };
      }
    } catch (err) {
      console.warn("OpenAI API error, falling back to local grounded fallback:", err);
    }
  }

  // 3. Deterministic Grounded Local Fallback
  const fallbackAnswer = generateLocalFallback(sanitized);
  return {
    answer: fallbackAnswer,
    provider: "grounded-fallback",
    sources: matchedCategories,
  };
}
