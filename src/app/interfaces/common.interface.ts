/**
 * Personal information interface
 */
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  avatar: string;
  resume: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

/**
 * Contact form interface
 */
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  preferredContact: 'email' | 'phone' | 'both';
}

/**
 * Statistics interface for homepage
 */
export interface Stats {
  experience: number;
  projects: number;
  clients: number;
  technologies: number;
}