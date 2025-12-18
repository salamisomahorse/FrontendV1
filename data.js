/**
 * @typedef {'GUEST' | 'TALENT' | 'CLIENT' | 'ADMIN' | 'INTERNAL_STAFF'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {string[]} [skills]
 * @property {string} [resume]
 * @property {string} [phone]
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} clientName
 * @property {'Active' | 'Completed' | 'Pending'} status
 * @property {string} description
 * @property {string} startDate
 */

/**
 * @typedef {Object} TalentProfile
 * @property {string} id
 * @property {string} name
 * @property {string} title
 * @property {string[]} skills
 * @property {'Available' | 'Contracted'} availability
 * @property {number} rating
 * @property {number} projectsCompleted
 */
 
 /**
 * @typedef {Object} AnalyticsMetric
 * @property {string} label
 * @property {string | number} value
 * @property {'up' | 'down' | 'neutral'} trend
 * @property {string} percentage
 */

// --- CONSTANTS ---

export const MOCK_TALENT = [
  { id: 't1', name: 'Amara Diop', title: 'Senior ML Engineer', skills: ['Python', 'TensorFlow', 'AgriTech'], availability: 'Available', rating: 4.9, projectsCompleted: 14 },
  { id: 't2', name: 'Kwame Osei', title: 'Full Stack Developer', skills: ['React', 'Node.js', 'Fintech'], availability: 'Contracted', rating: 4.7, projectsCompleted: 8 },
  { id: 't3', name: 'Zahra Hassan', title: 'Data Scientist', skills: ['Pandas', 'R', 'HealthTech'], availability: 'Available', rating: 5.0, projectsCompleted: 22 },
];

export const ADMIN_STATS = [
  { label: 'Total Talent', value: '1,240', trend: 'up', percentage: '+12%' },
  { label: 'Active Projects', value: '85', trend: 'up', percentage: '+5%' },
  { label: 'Client Partners', value: '42', trend: 'up', percentage: '+3%' },
  { label: 'High-Risk Alerts', value: '3', trend: 'down', percentage: '-5%' },
];

export const MOCK_USERS = {
  talent: { id: '1', name: 'John Doe', email: 'john@nexus.africa', role: 'TALENT', skills: ['Python', 'FastAPI'], resume: 'john_cv.pdf', phone: '+254712345678' },
  client: { id: '2', name: 'Tech Corp', email: 'cto@techcorp.com', role: 'CLIENT' },
  admin: { id: '3', name: 'Admin User', email: 'admin@nexus.africa', role: 'ADMIN' },
  internal_staff: { id: '4', name: 'Staff Member', email: 'staff@nexus.africa', role: 'INTERNAL_STAFF' },
};


// --- MOCK API SERVICE ---

// GET /v1/projects
export const getEngineerProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { id: 'p1', title: 'Fintech Credit Risk API', clientName: 'EquityBank', status: 'Active', description: 'Developing a Python FastAPI service for real-time credit scoring.', startDate: '2024-10-01' },
    { id: 'p2', title: 'Crop Disease Classification Model', clientName: 'AgriScan', status: 'Pending', description: 'Training a ResNet50 model to identify cassava diseases.', startDate: '2024-11-15' }
  ];
};

// --- GEMINI SERVICE ---
// Note: This requires a valid API key to be configured in the environment.
// Since we are in a pure client-side app, this would expose the key.
// In a real scenario, this function would call a secure backend endpoint
// that then calls the Gemini API.

export const generateTechnicalSolution = async (problemStatement) => {
  // Mocking the Gemini API call to avoid exposing API keys on the frontend.
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!problemStatement || problemStatement.trim().length < 10) {
    return "Please provide a more detailed problem statement.";
  }
  
  return `
### **Proposed Solution: Mobile-First Crop Advisory**

#### **Core Technologies**
*   **Frontend:** Progressive Web App (PWA) using HTML/JS for offline access.
*   **Backend:** Python (FastAPI) for API endpoints.
*   **AI Model:** TensorFlow Lite for on-device image classification.
*   **Communication:** SMS/USSD integration via Africa's Talking API for low-connectivity areas.

#### **Implementation Steps**
1.  **Data Collection:** Aggregate images of local crop diseases to train the initial model.
2.  **MVP Development:** Build the PWA with image upload and basic classification results.
3.  **Scale:** Integrate USSD for non-smartphone users and expand the model's knowledge base.
  `;
};
