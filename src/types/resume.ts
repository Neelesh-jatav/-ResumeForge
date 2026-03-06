export interface ImagePosition {
  x: number;
  y: number;
  size: number;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  summary: string;
  profileImage: string;
  showProfileImage: boolean;
  imagePosition: ImagePosition;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  technologies: string;
  description: string;
}

export interface Honor {
  id: string;
  title: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skillCategories: SkillCategory[];
  projects: Project[];
  honors: Honor[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    twitter: '',
    website: '',
    summary: '',
    profileImage: '',
    showProfileImage: false,
    imagePosition: { x: 0, y: 0, size: 64 },
  },
  experience: [],
  education: [],
  skillCategories: [],
  projects: [],
  honors: [],
};
