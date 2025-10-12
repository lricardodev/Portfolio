// Portfolio
export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export interface Project {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ContactPill {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  animation: string;
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export type Skills = Record<string, string[]>;
