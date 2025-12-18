
import { User, ProjectOutcome, Project, ProjectRequirement, FraudAlert, FraudRule } from '../types';
import { MOCK_FRAUD_ALERTS, MOCK_FRAUD_RULES } from '../constants';

/**
 * MOCK API SERVICE
 * 
 * Target Backend Stack:
 * - Runtime: Python 3.10+
 * - Framework: FastAPI
 * - Database: PostgreSQL
 */

// POST /v1/talent/signup
export const registerTalent = async (formData: any): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: formData.name,
    email: formData.email,
    // FIX: Changed 'ENGINEER' to 'TALENT' to match the UserRole type definition.
    role: 'TALENT',
    skills: formData.skills || [],
    bio: formData.bio,
    resume: formData.resume,
    phone: formData.phone,
  };
};

// GET /v1/projects
export const getEngineerProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    {
      id: 'p1',
      title: 'Fintech Credit Risk API',
      clientName: 'EquityBank',
      status: 'Active',
      description: 'Developing a Python FastAPI service for real-time credit scoring.',
      startDate: '2024-10-01'
    },
    {
      id: 'p2',
      title: 'Crop Disease Classification Model',
      clientName: 'AgriScan',
      status: 'Pending',
      description: 'Training a ResNet50 model to identify cassava diseases.',
      startDate: '2024-11-15'
    }
  ];
};

// POST /v1/projects
export const createProject = async (projectData: Partial<Project>, requirements: ProjectRequirement[]): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  console.log("POST /v1/projects", { projectData, requirements });

  return {
    id: Math.random().toString(36).substr(2, 9),
    title: projectData.title || 'Untitled Project',
    clientName: projectData.clientName || 'Unknown Client',
    status: 'Pending',
    description: projectData.description || '',
    startDate: projectData.startDate || new Date().toISOString().split('T')[0],
    requirements: requirements
  };
}

// POST /v1/project_outcomes
export const submitProjectOutcome = async (outcome: ProjectOutcome): Promise<boolean> => {
  console.log("POST /v1/project_outcomes with structured data:", outcome);
  await new Promise(resolve => setTimeout(resolve, 800));
  // In a real app, the backend would validate this payload against its schema.
  return true;
};


let fraudRulesDB = [...MOCK_FRAUD_RULES]; // a mutable copy for simulation

// GET /v1/fraud/alerts
export const getFraudAlerts = async (): Promise<FraudAlert[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_FRAUD_ALERTS;
};

// GET /v1/fraud/rules
export const getFraudRules = async (): Promise<FraudRule[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return fraudRulesDB;
};

// PATCH /v1/fraud/rules/:id
export const updateFraudRule = async (ruleId: string, updates: Partial<FraudRule>): Promise<FraudRule> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const ruleIndex = fraudRulesDB.findIndex(r => r.id === ruleId);
  if (ruleIndex === -1) throw new Error('Rule not found');
  
  fraudRulesDB[ruleIndex] = { ...fraudRulesDB[ruleIndex], ...updates };
  return fraudRulesDB[ruleIndex];
};
