export type DetailItem = {
  label: string;
  value: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type LanguageItem = {
  name: string;
  speaking: string;
  reading: string;
  writing: string;
};

export type SocialItem = {
  label: string;
  value: string;
  url: string;
};

export type ExperienceItem = {
  id?: number;
  period: string;
  company: string;
  position: string;
  location: string;
  salary?: string | null;
  highlights: string[];
  sortOrder: number;
};

export type ProjectItem = {
  id?: number;
  name: string;
  category: string;
  stack: string;
  summary: string;
  impact: string;
  link?: string | null;
  sortOrder: number;
};

export type EducationItem = {
  id?: number;
  period: string;
  school: string;
  degree: string;
  major?: string | null;
  faculty?: string | null;
  gpa?: string | null;
  sortOrder: number;
};

export type CertificateItem = {
  id?: number;
  period: string;
  issuer: string;
  title: string;
  sortOrder: number;
};

export type PortfolioData = {
  profile: {
    id: number;
    fullName: string;
    nickname: string;
    headline: string;
    subheadline: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
    resumeFocus: string;
    yearsExperience: string;
    projectCount: string;
    currentRole: string;
    expectedSalary: string;
    startWindow: string;
    avatarPath: string;
    primaryColor: string;
    secondaryColor: string;
    personalDetails: DetailItem[];
    highlightItems: string[];
    skillGroups: SkillGroup[];
    languages: LanguageItem[];
    strengths: string[];
    typingSpeed: string;
    transport: string;
    socials: SocialItem[];
  };
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  certificates: CertificateItem[];
};
