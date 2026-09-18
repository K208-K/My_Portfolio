// ============================================================
// NAVIGATION CONFIGURATION — Define once, use everywhere
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academic", href: "/academic" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Learning", href: "/learning" },
  { label: "AI Assistant", href: "/ai-assistant" },
  { label: "Terminal", href: "/terminal" },
  { label: "Contact", href: "/contact" },
];

export const ctaNav: NavItem[] = [
  { label: "Resume", href: "/resume" },
];
