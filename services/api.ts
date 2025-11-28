
import { User, ProjectOutcome } from '../types';

/**
 * MOCK API SERVICE
 * 
 * Target Backend Stack:
 * - Runtime: Python 3.10+
 * - Framework: FastAPI
 * - Database: PostgreSQL
 * 
 * This service simulates the contract for the MVP endpoints.
 */

// POST /v1/talent/signup
export const registerTalent = async (formData: any): Promise<User> => {
  console.log("POST /v1/talent/signup payload:", formData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return a mock created user
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: formData.name,
    email: formData.email,
    role: 'ENGINEER',
    skills: formData.skills || [],
    bio: formData.bio,
    resume: formData.resume
  };
};

// POST /v1/project_outcomes
export const submitProjectOutcome = async (outcome: ProjectOutcome): Promise<boolean> => {
  console.log("POST /v1/project_outcomes payload:", outcome);
  
  // Simulate network delay and DB write to PostgreSQL
  await new Promise(resolve => setTimeout(resolve, 800));

  return true;
};
