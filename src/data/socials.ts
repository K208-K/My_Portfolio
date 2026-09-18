// ============================================================
// SINGLE SOURCE OF TRUTH — Social Links
// ============================================================

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  username?: string;
  icon: string; // Lucide icon name
}

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "K208-K"}`,
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "K208-K",
    icon: "Github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    // [PLACEHOLDER] — Replace with real LinkedIn URL
    url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/[YOUR_LINKEDIN]",
    icon: "Linkedin",
  },
  {
    id: "email",
    label: "Email",
    // [PLACEHOLDER] — Replace with real email
    url: "mailto:[YOUR_EMAIL@example.com]",
    username: "[YOUR_EMAIL@example.com]",
    icon: "Mail",
  },
];

export function getSocialById(id: string) {
  return socials.find((s) => s.id === id);
}
