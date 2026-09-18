import { getPortfolioKnowledgeBase } from "./knowledge";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { learningItems } from "@/data/learning";
import { profile } from "@/data/profile";

export interface RetrievedContext {
  relevantContext: string;
  matchedCategories: string[];
}

/**
 * Retrieves the most relevant knowledge slices based on user query keywords.
 */
export function retrieveContext(query: string): RetrievedContext {
  const q = query.toLowerCase();
  const matchedCategories: string[] = [];
  const slices: string[] = [];

  // Profile / About check
  if (
    q.includes("who") ||
    q.includes("karrim") ||
    q.includes("karim") ||
    q.includes("about") ||
    q.includes("bio") ||
    q.includes("direction") ||
    q.includes("philosophy")
  ) {
    matchedCategories.push("profile");
    slices.push(
      `PROFILE:\nName: ${profile.name} (${profile.nickname})\nTitle: ${profile.title}\nBio: ${profile.shortBio}\nCareer Direction: ${profile.careerDirection}\nPhilosophy: ${profile.philosophy}\nLocation: ${profile.location}`
    );
  }

  // Education / Academic check
  if (
    q.includes("study") ||
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("academic") ||
    q.includes("school") ||
    q.includes("degree") ||
    q.includes("btech") ||
    q.includes("cgpa") ||
    q.includes("marks")
  ) {
    matchedCategories.push("education");
    slices.push(
      `EDUCATION:\n` +
        education
          .map(
            (e) =>
              `- ${e.level} at ${e.institution} (${e.startYear}-${e.endYear}). ${
                e.field ? `Field: ${e.field}.` : ""
              } ${e.cgpa ? `CGPA: ${e.cgpa}.` : ""} ${
                e.percentage ? `Marks: ${e.percentage}.` : ""
              }`
          )
          .join("\n")
    );
  }

  // Skills check
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("python") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("tool")
  ) {
    matchedCategories.push("skills");
    slices.push(
      `SKILLS:\n` +
        skillCategories
          .map(
            (cat) =>
              `- ${cat.label}: ${cat.skills.map((s) => `${s.name} (${s.proficiency})`).join(", ")}`
          )
          .join("\n")
    );
  }

  // Projects check
  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("heart") ||
    q.includes("house") ||
    q.includes("ocr") ||
    q.includes("captcha") ||
    q.includes("portfolio") ||
    q.includes("interview") ||
    q.includes("model") ||
    q.includes("work")
  ) {
    matchedCategories.push("projects");
    const matchingProjects = projects.filter((p) => {
      const matchText = `${p.title} ${p.category} ${p.technologies.join(" ")} ${p.description}`.toLowerCase();
      // If user asks generally about projects, include all
      if (q.includes("project") || q.includes("built") || q.includes("work")) return true;
      return matchText.split(" ").some((w) => w.length > 3 && q.includes(w));
    });

    slices.push(
      `PROJECTS:\n` +
        (matchingProjects.length > 0 ? matchingProjects : projects)
          .map(
            (p) =>
              `- "${p.title}" (${p.categoryLabel}, Status: ${p.status})\n  Summary: ${p.description}\n  Tech: ${p.technologies.join(", ")}\n  Link: /projects/${p.category}/${p.slug}`
          )
          .join("\n\n")
    );
  }

  // Learning check
  if (
    q.includes("learn") ||
    q.includes("grow") ||
    q.includes("goal") ||
    q.includes("currently") ||
    q.includes("future")
  ) {
    matchedCategories.push("learning");
    slices.push(
      `LEARNING JOURNEY:\n` +
        learningItems
          .map((l) => `- [${l.status}] ${l.topic} (${l.area}): ${l.description}`)
          .join("\n")
    );
  }

  // Contact / Socials / Resume check
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("hire") ||
    q.includes("github") ||
    q.includes("linkedin") ||
    q.includes("resume") ||
    q.includes("cv")
  ) {
    matchedCategories.push("contact");
    slices.push(
      `CONTACT & DOCUMENTS:\n- Availability: ${profile.availability}\n- Resume: /resume\n- Contact Page: /contact\n- GitHub: ${profile.github}\n- LinkedIn: ${profile.linkedin}`
    );
  }

  // If no specific category matched or general inquiry, provide the full knowledge base
  if (slices.length === 0) {
    return {
      relevantContext: getPortfolioKnowledgeBase(),
      matchedCategories: ["full"],
    };
  }

  return {
    relevantContext: slices.join("\n\n"),
    matchedCategories,
  };
}
