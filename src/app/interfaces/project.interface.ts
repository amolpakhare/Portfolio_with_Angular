  /**
 * Project interface for portfolio projects (Customized for Vivek’s Portfolio)
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  links: ProjectLinks;
  features: string[];
  challenges: string[];
  solutions: string[];
  timeline: string;
  teamSize?: number;
  role?: string;
}

/**
 * External project links
 */
export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
  case_study?: string;
}

/**
 * Categories for your portfolio projects
 */
export type ProjectCategory =
  | 'Web Application'   // Example: JEE College Predictor
  | 'Dashboard'         // Example: Blinkit or Festival Analysis
  | 'API'               // Example: Employee Management or Data Automation
  | 'Other';

/**
 * Project statuses
 */
export type ProjectStatus =
  | 'Completed'
  | 'In Progress';

// JEE College Predictor → Web Application (Completed)
// Blinkit Sales Analysis → Dashboard (Completed)
// Festival Sales Analysis → Dashboard (Completed)
// Employee Management API → API (Completed)
// Data Automation System → API (Completed)
// Analytics Dashboard Backend → API (In Progress)
 
