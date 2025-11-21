export interface Socials {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  website: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string; // For typing effect
  location: string;
  about: string;
  skills: string[];
  socials: Socials;
  showStats: boolean;
  showStreaks: boolean;
  showTrophies: boolean;
  showVisitorCount: boolean;
  showTopLangs: boolean;
  theme: string;
}

export enum TechStack {
  HTML = 'html5',
  CSS = 'css3',
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  React = 'react',
  Vue = 'vue',
  Angular = 'angular',
  Node = 'nodejs',
  PHP = 'php',
  Laravel = 'laravel',
  MySQL = 'mysql',
  PostgreSQL = 'postgresql',
  MongoDB = 'mongodb',
  Python = 'python',
  Java = 'java',
  Bootstrap = 'bootstrap',
  Tailwind = 'tailwindcss',
  Git = 'git',
  Docker = 'docker',
  Figma = 'figma'
}