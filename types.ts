
export type UserRole = 'GUEST' | 'ENGINEER' | 'CLIENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  github?: string;
  skills?: string[];
  resume?: string; // filename or url
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  status: 'Active' | 'Completed' | 'Pending';
  description: string;
  startDate: string;
}

export interface ProjectOutcome {
  projectId: string;
  metricLabel: string; // e.g., "Transaction Speed"
  metricValue: string; // e.g., "+40%"
  summary: string;
  submittedAt: string;
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
