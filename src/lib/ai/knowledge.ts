import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { learningItems } from "@/data/learning";
import { socials } from "@/data/socials";

/**
 * Compiled verified portfolio knowledge base.
 * This is the SINGLE source of facts used by the AI assistant.
 */
export function getPortfolioKnowledgeBase(): string {
  const educationText = education
    .map(
      (e) =>
        `- ${e.level}: ${e.institution} (${e.startYear} - ${e.endYear}). ${
          e.field ? `Field: ${e.field}.` : ""
        } ${e.cgpa ? `CGPA: ${e.cgpa}.` : ""} ${
          e.percentage ? `Percentage: ${e.percentage}.` : ""
        } ${e.description || ""}`
    )
    .join("\n");

  const skillsText = skillCategories
    .map(
      (cat) =>
        `- ${cat.label}: ${cat.skills.map((s) => `${s.name} (${s.proficiency})`).join(", ")}`
    )
    .join("\n");

  const projectsText = projects
    .map(
      (p) =>
        `- Project: "${p.title}" (Category: ${p.categoryLabel}, Status: ${p.status})
   Description: ${p.description}
   Technologies: ${p.technologies.join(", ")}
   GitHub: ${p.githubUrl || "Not public"}
   Live URL: ${p.liveUrl || "None"}
   Slug: /projects/${p.category}/${p.slug}`
    )
    .join("\n\n");

  const learningText = learningItems
    .map((l) => `- [${l.status}] ${l.topic} (${l.area}): ${l.description}`)
    .join("\n");

  const socialsText = socials.map((s) => `- ${s.label}: ${s.url}`).join("\n");

  return `
PORTFOLIO DATA FOR ABDUL KARIM (KARRIM):

PROFILE:
Name: ${profile.name} (${profile.nickname})
Title: ${profile.title}
Tagline: ${profile.tagline}
Bio: ${profile.shortBio}
Career Direction: ${profile.careerDirection}
Personal Philosophy: ${profile.philosophy}
Availability: ${profile.availability}
Location: ${profile.location}

EDUCATION:
${educationText}

SKILLS:
${skillsText}

PROJECTS:
${projectsText}

LEARNING JOURNEY:
${learningText}

CONTACT & LINKS:
${socialsText}
Resume: /resume
`;
}
