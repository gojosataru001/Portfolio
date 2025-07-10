export interface CVFormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  photo: string;
  summary: string;
  education: { degree: string; institution: string; year: string }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  technicalSkills: string[];
  projects: {
    title: string;
    tech: string;
    description: string;
    link: string;
  }[];
  certifications?: {
    title: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
}
