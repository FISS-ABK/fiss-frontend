// Vacancy Management Types
export interface VacancyRequirement {
  text: string;
}

export interface Vacancy {
  _id?: string | number;
  title: string;
  icon?: string; // Optional icon identifier
  jobDescription: string;
  requirements: VacancyRequirement[];
  department?: string;
  location?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract';
  postedDate?: string;
  isActive?: boolean;
}
