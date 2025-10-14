/**
 * Experience interface for work experience
 */
export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  type: EmploymentType;
  startDate: string;
  endDate: string | 'Present';
  duration: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logo?: string;
  companyUrl?: string;
  projects?: WorkProject[];
}

export interface WorkProject {
  name: string;
  description: string;
  technologies: string[];
  impact?: string;
}

export type EmploymentType = 
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Freelance';

/**
 * Education interface
 */
export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade?: string;
  achievements?: string[];
  coursework?: string[];
}