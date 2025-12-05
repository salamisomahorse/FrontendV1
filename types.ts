
export type UserRole = 'GUEST' | 'TALENT' | 'CLIENT' | 'ADMIN' | 'INTERNAL_STAFF';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  github?: string;
  phone?: string;
  skills?: string[];
  resume?: string; // filename or url
}

export interface ProjectRequirement {
  id?: string;
  skill: string;
  minExperience: number; // Years
  level: 'Junior' | 'Mid' | 'Senior' | 'Expert';
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  status: 'Active' | 'Completed' | 'Pending';
  description: string;
  startDate: string;
  requirements?: ProjectRequirement[];
}

export interface ProjectOutcome {
  projectId: string;
  summary: string;
  submittedAt: string;

  // Performance Metrics
  delivery_speed_days?: number;
  prediction_accuracy?: number; // 0-100
  
  // Quality & Satisfaction Metrics
  client_satisfaction_rating?: number; // 1-5
  code_quality_score?: number; // 1-5
  
  // Business Metrics
  forecast_accuracy_percentage?: number; // 0-100
  user_engagement_rate?: number; // 0-1
  retention_rate?: number; // 0-1
  requirements_completion_rate?: number; // 0-1
}


export interface TalentProfile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  availability: 'Available' | 'Contracted';
  rating: number;
  projectsCompleted: number;
}

export interface AnalyticsMetric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  percentage: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Contract' | 'Freelance';
  location: string;
  postedDate: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// Deprecated MVP types, kept to avoid breaking old imports if any exist
export interface Course {
  id: string;
  title: string;
  sector: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  thumbnail: string;
}

export interface AiTool {
  id: string;
  name: string;
  description: string;
  sector: string;
  demoUrl: string;
}
