/**
 * Skill interface for skills section
 */
export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  icon: string;
  gradient: string;
  experience: string;
  proficiency: number;
  description: string;
  projects: string[];
  certifications?: string[];
  level: SkillLevel;
}

export type SkillCategory = 
  | 'Frontend Framework'
  | 'Backend Framework' 
  | 'Programming Language'
  | 'Database'
  | 'CSS Framework'
  | 'Library'
  | 'Tool'
  | 'Cloud Service'
  | 'Other';

export type SkillLevel = 
  | 'Beginner'
  | 'Intermediate' 
  | 'Advanced'
  | 'Expert';

/**
 * Skill group for organizing skills by category
 */
export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
  icon: string;
  color: string;
}