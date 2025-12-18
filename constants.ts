import { Course, TalentProfile, AiTool, AnalyticsMetric, ActivityItem, FraudAlert, FraudRule } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'AI for Fintech: Risk Assessment Models',
    sector: 'Fintech',
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    thumbnail: 'https://picsum.photos/seed/fintech/400/200',
  },
  {
    id: '2',
    title: 'Computer Vision in AgriTech',
    sector: 'AgriTech',
    progress: 10,
    totalModules: 20,
    completedModules: 2,
    thumbnail: 'https://picsum.photos/seed/agri/400/200',
  },
  {
    id: '3',
    title: 'Health Data Privacy & Ethics',
    sector: 'HealthTech',
    progress: 0,
    totalModules: 8,
    completedModules: 0,
    thumbnail: 'https://picsum.photos/seed/health/400/200',
  },
];

export const MOCK_TALENT: TalentProfile[] = [
  {
    id: 't1',
    name: 'Amara Diop',
    title: 'Senior ML Engineer',
    skills: ['Python', 'TensorFlow', 'AgriTech'],
    availability: 'Available',
    rating: 4.9,
    projectsCompleted: 14,
  },
  {
    id: 't2',
    name: 'Kwame Osei',
    title: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'Fintech'],
    availability: 'Contracted',
    rating: 4.7,
    projectsCompleted: 8,
  },
  {
    id: 't3',
    name: 'Zahra Hassan',
    title: 'Data Scientist',
    skills: ['Pandas', 'R', 'HealthTech'],
    availability: 'Available',
    rating: 5.0,
    projectsCompleted: 22,
  },
];

export const FEATURED_TOOLS: AiTool[] = [
  {
    id: 'tool1',
    name: 'CropGuard AI',
    description: 'Early disease detection using mobile camera input.',
    sector: 'AgriTech',
    demoUrl: '#',
  },
  {
    id: 'tool2',
    name: 'CreditFlow',
    description: 'SME loan risk assessment for unbanked regions.',
    sector: 'Fintech',
    demoUrl: '#',
  },
];

export const ADMIN_STATS: AnalyticsMetric[] = [
  { label: 'Total Talent', value: '1,240', trend: 'up', percentage: '+12%' },
  { label: 'Active Projects', value: '85', trend: 'up', percentage: '+5%' },
  { label: 'Client Partners', value: '42', trend: 'up', percentage: '+3%' },
  { label: 'High-Risk Alerts', value: '3', trend: 'down', percentage: '-5%' },
];

export const MOCK_ACTIVITY_FEED: ActivityItem[] = [
  { id: '1', type: 'OUTCOME_SUBMITTED', description: 'submitted an outcome for "Fintech Credit Risk API"', actor: 'John Doe', timestamp: '5m ago' },
  { id: '2', type: 'PROJECT_CREATED', description: 'created a new project "AgriScan Expansion"', actor: 'Tech Corp', timestamp: '1h ago' },
  { id: '3', type: 'TALENT_ONBOARDED', description: 'completed onboarding', actor: 'Zahra Hassan', timestamp: '3h ago' },
  { id: '4', type: 'MATCH_CONFIRMED', description: 'was matched to "Crop Disease Model"', actor: 'Kwame Osei', timestamp: '1d ago' },
  { id: '5', type: 'OUTCOME_SUBMITTED', description: 'submitted an outcome for "Health Data Privacy"', actor: 'Amara Diop', timestamp: '2d ago' },
];

export const MOCK_FRAUD_ALERTS: FraudAlert[] = [
  { id: 'fa1', severity: 'High', description: 'Transaction amount exceeds velocity limit', timestamp: '2 mins ago', transactionId: 'txn_123abc', userId: 'user_456' },
  { id: 'fa2', severity: 'Medium', description: 'Login from new device and location', timestamp: '15 mins ago', transactionId: 'n/a', userId: 'user_789' },
  { id: 'fa3', severity: 'Low', description: 'Multiple failed payment attempts', timestamp: '1 hour ago', transactionId: 'txn_789xyz', userId: 'user_101' },
  { id: 'fa4', severity: 'High', description: 'Rapid succession of high-value transfers', timestamp: '3 hours ago', transactionId: 'txn_456def', userId: 'user_212' },
];

export const MOCK_FRAUD_RULES: FraudRule[] = [
  { id: 'rule1', name: 'High Value Transaction', description: 'Flag transactions over a certain amount.', isEnabled: true, threshold: 10000, condition: 'GREATER_THAN' },
  { id: 'rule2', name: 'Transaction Velocity', description: 'Flag accounts with more than 5 transactions in an hour.', isEnabled: true, threshold: 5, condition: 'GREATER_THAN' },
  { id: 'rule3', name: 'New Device Login', description: 'Flag logins from unrecognized devices.', isEnabled: false, threshold: 1, condition: 'GREATER_THAN' },
  { id: 'rule4', name: 'Geographic Impossibility', description: 'Flag logins from geographically distant locations in a short time.', isEnabled: true, threshold: 5000, condition: 'GREATER_THAN' },
];
