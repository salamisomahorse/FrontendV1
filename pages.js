import { Button, Card, Badge, Input, Skeleton } from './components.js';
import * as Data from './data.js';

const Icons = {
  ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 w-5 h-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  Cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400 mb-3"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  Leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400 mb-3"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10z"/><path d="M12 2a7 7 0 0 1 7 7h2a10 10 0 0 0-10-10z"/></svg>`,
  HeartPulse: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 mb-3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1 2.1 4.4 1.4-2.2H21"/></svg>`,
  GraduationCap: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400 mb-3"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  ShieldCheck: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`,
  CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-nexus-500 mr-3 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`,
  Search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-3 text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  Star: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
};

export const LandingPage = () => `
  <div class="space-y-16 animate-fade-in">
    <section class="text-center space-y-6 pt-10 pb-16">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
        The Innovative Platform for <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-nexus-400 to-blue-500">
          Industrial AI Solutions
        </span>
      </h1>
      <p class="max-w-2xl mx-auto text-lg text-slate-400">
        Somahorse Nexus connects African industries (Fintech, AgriTech, HealthTech) with vetted AI Talent.
        We provide the infrastructure for secure talent onboarding and project outcome tracking.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        ${Button({ size: 'lg', children: 'Join as Talent', dataEvent: 'click:handleNavigate', additionalParams: '["signup"]' })}
        ${Button({ size: 'lg', variant: 'outline', children: `${Icons.ShieldCheck} Find Talent`, dataEvent: 'click:handleNavigate', additionalParams: '["industry"]' })}
      </div>
    </section>

    <section class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-nexus-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div class="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div>
            <h2 class="text-3xl font-bold text-white leading-tight mb-4">
              Strategic AI Partnerships for <br/>
              <span class="text-nexus-400">Africa's Key Sectors</span>
            </h2>
            <p class="text-slate-300 text-lg leading-relaxed">
              To leaders in <strong>Fintech, AgriTech, HealthTech, and EdTech</strong>: 
              The gap between complex industrial problems and technical execution ends here. 
            </p>
          </div>
          <ul class="space-y-4">
            <li class="flex items-start text-slate-400">${Icons.CheckCircle}<span>Access rigorously vetted engineering talent specialized in your domain.</span></li>
            <li class="flex items-start text-slate-400">${Icons.CheckCircle}<span>Deploy custom models for credit risk, crop yield, and diagnostics.</span></li>
            <li class="flex items-start text-slate-400">${Icons.CheckCircle}<span>Accelerate innovation with outcome-driven project tracking.</span></li>
          </ul>
          <div class="pt-2">
            ${Button({ size: 'lg', children: `Explore Talent ${Icons.ArrowRight}`, dataEvent: 'click:handleNavigate', additionalParams: '["industry"]' })}
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${Card({ className: 'p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors', children: `${Icons.Cpu}<h3 class="font-bold text-white text-lg">Fintech</h3><p class="text-sm text-slate-400 mt-2">Integrate fraud detection & algorithmic credit scoring.</p>` })}
          ${Card({ className: 'p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors', children: `${Icons.Leaf}<h3 class="font-bold text-white text-lg">AgriTech</h3><p class="text-sm text-slate-400 mt-2">Deploy computer vision for crop health & yield analysis.</p>` })}
          ${Card({ className: 'p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors', children: `${Icons.HeartPulse}<h3 class="font-bold text-white text-lg">HealthTech</h3><p class="text-sm text-slate-400 mt-2">Secure patient data analytics & remote diagnostics.</p>` })}
          ${Card({ className: 'p-5 border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition-colors', children: `${Icons.GraduationCap}<h3 class="font-bold text-white text-lg">EdTech</h3><p class="text-sm text-slate-400 mt-2">Build adaptive learning engines & personalized tutoring.</p>` })}
        </div>
      </div>
    </section>
  </div>
`;

export const AdminDashboard = () => `
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-white">Platform Overview</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      ${Data.ADMIN_STATS.map(stat => Card({ className: 'p-5', children: `
        <p class="text-sm text-slate-500">${stat.label}</p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-2xl font-bold text-white">${stat.value}</h3>
          <span class="text-xs font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-slate-400'}">
            ${stat.percentage}
          </span>
        </div>
      `})).join('')}
    </div>
    <p class="text-slate-500">Charts and live feeds would be rendered here using a library like Chart.js or by manually creating SVG elements.</p>
  </div>
`;

export const IndustryPortal = ({ addNotification }) => `
  <div class="space-y-8 animate-fade-in">
    <div class="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-500 to-blue-500"></div>
      <h1 class="text-3xl font-bold text-white mb-4">Find Vetted Technical Talent</h1>
      <p class="text-slate-400 mb-6 max-w-2xl mx-auto">
        Access Africa's top 1% of engineering talent specialized in AI, Fintech, and AgriTech.
      </p>
      <div class="max-w-xl mx-auto relative z-10">
        ${Icons.Search}
        ${Input({ placeholder: "Search by skill (e.g., Python, React...)", className: "pl-10" })}
      </div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${Data.MOCK_TALENT.map(talent => Card({ className: 'p-6 flex flex-col hover:border-nexus-500 transition-colors', children: `
          <div class="flex justify-between items-start mb-4">
            <div>
                <h3 class="font-bold text-white">${talent.name}</h3>
                <p class="text-sm text-nexus-400">${talent.title}</p>
            </div>
            ${Badge({ color: talent.availability === 'Available' ? 'green' : 'yellow', children: talent.availability })}
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
              ${talent.skills.map(skill => `<span class="px-2 py-1 bg-slate-900 rounded text-xs text-slate-300 border border-slate-700">${skill}</span>`).join('')}
          </div>
          <div class="mt-auto pt-4 border-t border-slate-700 flex justify-between items-center">
            <div class="flex items-center text-yellow-500 text-sm">${Icons.Star} ${talent.rating}</div>
            ${Button({ size: 'sm', variant: 'outline', children: 'View Profile', dataEvent: 'click:addNotification', additionalParams:'["info", "Profile views coming soon!"]' })}
          </div>
        `})).join('')}
    </div>
  </div>
`;

export const ProfilePage = ({ state }) => {
    if (!state.user) return '<div>Please login.</div>';
    return `
    <div class="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 class="text-3xl font-bold text-white">Profile: ${state.user.name}</h1>
        ${Card({ className: 'p-6', children: `
            <h3 class="font-bold text-white mb-4">Personal Details</h3>
            <div class="grid grid-cols-2 gap-4">
                ${Input({ label: 'Full Name', value: state.user.name, disabled: true })}
                ${Input({ label: 'Email Address', value: state.user.email, disabled: true })}
                ${Input({ label: 'Role', value: state.user.role, disabled: true })}
                ${Input({ label: 'Phone (Optional)', value: state.user.phone || '+254712345678', disabled: true })}
            </div>
        `})}
        ${Card({ className: 'p-6', children: `
            <h3 class="font-bold text-white mb-4">Technical Skills</h3>
            <div class="flex flex-wrap gap-2 mb-6">
                ${(state.user.skills || []).map(skill => Badge({ color: 'blue', children: skill })).join('')}
            </div>
        `})}
    </div>
    `;
};


export const TalentDashboard = ({ addNotification, eventHandlers }) => {
    // In a real app, this would fetch data
    let projects = [];
    let loading = true;
    
    eventHandlers.postRender = async () => {
        try {
            projects = await Data.getEngineerProjects();
            loading = false;
            // Re-render just this component's content
            document.getElementById('talent-dashboard-content').innerHTML = renderContent();
        } catch(e) {
            addNotification('error', 'Failed to load projects');
            loading = false;
             document.getElementById('talent-dashboard-content').innerHTML = renderContent();
        }
    };
    
    const renderContent = () => {
        if (loading) {
            return `<div class="grid md:grid-cols-2 gap-6">
                ${Skeleton({ className: "h-48 rounded-xl" })}
                ${Skeleton({ className: "h-48 rounded-xl" })}
            </div>`;
        }
        if (projects.length === 0) {
            return `<div class="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
                <h3 class="text-white font-bold">No Active Projects</h3>
            </div>`;
        }
        return `<div class="grid md:grid-cols-2 gap-6">
            ${projects.map(p => Card({ className: 'p-6', children: `
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-bold text-xl text-white">${p.title}</h3>
                    ${Badge({ color: p.status === 'Active' ? 'green' : 'yellow', children: p.status })}
                </div>
                <p class="text-sm text-nexus-400 font-medium mb-2">Client: ${p.clientName}</p>
                <p class="text-slate-400 text-sm mb-6">${p.description}</p>
            `})).join('')}
        </div>`;
    };

    return `
    <div class="space-y-8 animate-fade-in">
        <div class="flex justify-between items-end">
            <div>
                <h1 class="text-3xl font-bold text-white">Talent Workspace</h1>
                <p class="text-slate-400 mt-2">Manage your active contracts and report success metrics.</p>
            </div>
            ${Badge({ color: 'green', children: 'Status: Active' })}
        </div>
        <h2 class="text-xl font-bold text-white border-b border-slate-800 pb-2">Assigned Projects</h2>
        <div id="talent-dashboard-content">
            ${renderContent()}
        </div>
    </div>
    `;
};

// --- Form Pages ---

export const LoginPage = ({ state }) => `
  <div class="flex justify-center items-center py-20 animate-fade-in">
    ${Card({ className: "w-full max-w-md p-8", children: `
      ${state.mfaStep ? `
        <h2 class="text-2xl font-bold text-white mb-2 text-center">Two-Factor Authentication</h2>
        <p class="text-center text-slate-400 text-sm mb-6">Enter the code (123456).</p>
        <form data-event="submit:handleMfaSubmit" class="space-y-4">
          ${Input({ placeholder: "6-digit code", type: "text", dataState: 'mfaCode', maxLength: 6 })}
          ${Button({ children: 'Verify', type: 'submit', isLoading: state.isLoggingIn, className: 'w-full' })}
        </form>
      ` : `
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Nexus Portal Login</h2>
        <form data-event="submit:handleLogin" class="space-y-4">
          ${Input({ placeholder: "Email", type: "email", dataState: 'email'})}
          <div class="space-y-1">
            <label class="block text-sm font-medium text-slate-400">Select Role</label>
            <select data-state="roleSelect" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none">
              <option value="TALENT">AI Talent</option>
              <option value="CLIENT">Industry Partner</option>
              <option value="ADMIN">Admin</option>
              <option value="INTERNAL_STAFF">Internal Staff</option>
            </select>
          </div>
          ${Button({ children: 'Sign In', type: 'submit', className: 'w-full', isLoading: state.isLoggingIn })}
        </form>
      `}
    `})}
  </div>
`;

export const SignupPage = () => `
  <div class="max-w-2xl mx-auto py-10 animate-fade-in">
    ${Card({ className: 'p-8', children: `
        <div class="mb-8 border-b border-slate-700 pb-4">
          <h1 class="text-2xl font-bold text-white">Join as an AI Talent</h1>
          <p class="text-slate-400 mt-1">
            Complete your profile to be matched with top African Fintech and AgriTech projects.
          </p>
        </div>
        <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-4">
                ${Input({ label: "Full Name", placeholder: "e.g. Amara Diop", required: true })}
                ${Input({ label: "Email Address", type: "email", placeholder: "talent@example.com", required: true })}
            </div>
            ${Input({ label: "Password", type: "password", placeholder: "Min 8 characters", required: true })}
            <div class="pt-4">
                ${Button({ children: 'Create Account (WIP)', type: 'submit', className: 'w-full', size: 'lg', disabled: true })}
            </div>
        </form>
    `})}
  </div>
`;

export const CreateProjectPage = () => `<div>Create Project Page (WIP)</div>`;
export const FraudDashboard = () => `<div>Fraud Dashboard Page (WIP)</div>`;
export const FraudRuleConfiguration = () => `<div>Fraud Rule Config Page (WIP)</div>`;
