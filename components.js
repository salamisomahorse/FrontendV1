// Reusable icon components
const Icons = {
  Menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  X: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
  LogOut: (size = 18) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  Loader2: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2 mr-2 h-4 w-4 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
  CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`,
  AlertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  Info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info text-blue-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  LayoutDashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
  Briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  Globe: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  UserIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  ShieldAlert: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`,
  Settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
};

export const Button = ({ children, variant = 'primary', size = 'md', className = '', isLoading = false, type = 'button', dataEvent = '', disabled = false }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-nexus-500 text-slate-900 hover:bg-nexus-400 border border-transparent",
    secondary: "bg-slate-700 text-white hover:bg-slate-600 border border-transparent",
    outline: "border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white",
    ghost: "text-slate-300 hover:bg-slate-800 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-500 border border-transparent",
  };

  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const isDisabled = isLoading || disabled;

  return `
    <button type="${type}" class="${baseStyles} ${variants[variant]} ${sizes[size]} ${className}" ${dataEvent ? `data-event="${dataEvent}"` : ''} ${isDisabled ? 'disabled' : ''}>
      ${isLoading ? Icons.Loader2 : ''}
      ${children}
    </button>
  `;
};

export const Card = ({ children, className = '' }) => `
  <div class="bg-slate-800/50 border border-slate-700 rounded-xl ${className}">
    ${children}
  </div>
`;

export const Input = ({ label, id, error, className = '', type = 'text', placeholder = '', required = false, value, dataState = '', ...rest }) => `
  <div class="w-full">
    ${label ? `<label for="${id}" class="block text-sm font-medium text-slate-400 mb-1">${label}</label>` : ''}
    <input 
      id="${id}"
      type="${type}"
      placeholder="${placeholder}"
      ${required ? 'required' : ''}
      ${dataState ? `data-state="${dataState}"` : ''}
      class="w-full bg-slate-900 border rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-nexus-500 ${error ? 'border-red-500' : 'border-slate-700'} ${className}"
      ${Object.entries(rest).map(([key, val]) => `${key}="${val}"`).join(' ')}
    />
    ${error ? `<p class="mt-1 text-xs text-red-400">${error}</p>` : ''}
  </div>
`;

export const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return `<span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}">${children}</span>`;
};

export const Toast = ({ type, message, id }) => {
  const icons = { success: Icons.CheckCircle, error: Icons.AlertCircle, info: Icons.Info };
  setTimeout(() => {
      const el = document.getElementById(`toast-${id}`);
      if (el) el.remove();
  }, 5000);

  return `
    <div id="toast-${id}" class="max-w-sm w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border border-slate-700 animate-fade-in">
      <div class="p-4 flex items-start">
        <div class="flex-shrink-0">${icons[type]}</div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium text-white">${message}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button data-event="click:removeNotification" data-params='["${id}"]' class="inline-flex text-slate-400 hover:text-slate-200">
            ${Icons.X}
          </button>
        </div>
      </div>
    </div>
  `;
};

export const Skeleton = ({ className = '' }) => `
  <div class="bg-slate-700 animate-pulse rounded-md ${className}"></div>
`;

// --- MAIN LAYOUT ---

const getNavItems = (user) => {
  if (!user) return [{ id: 'landing', label: 'Home', icon: Icons.Globe }];
  switch (user.role) {
    case 'TALENT': return [
        { id: 'talent_dashboard', label: 'Workspace', icon: Icons.LayoutDashboard },
        { id: 'profile', label: 'My Profile', icon: Icons.UserIcon },
      ];
    case 'CLIENT': return [
        { id: 'industry', label: 'Find Talent', icon: Icons.Briefcase },
        { id: 'profile', label: 'Company Profile', icon: Icons.UserIcon },
      ];
    case 'ADMIN':
    case 'INTERNAL_STAFF': return [
        { id: 'admin', label: 'Admin Panel', icon: Icons.LayoutDashboard },
        { id: 'industry', label: 'Industry Portal', icon: Icons.Briefcase },
        { id: 'fraud_dashboard', label: 'Fraud Center', icon: Icons.ShieldAlert },
        { id: 'fraud_rules', label: 'Rule Configuration', icon: Icons.Settings },
      ];
    default: return [{ id: 'landing', label: 'Home', icon: Icons.Globe }];
  }
};

const getBreadcrumb = (currentPage) => {
  const map = {
    'landing': 'Home', 'signup': 'Talent Registration', 'talent_dashboard': 'Talent Workspace',
    'industry': 'Industry Portal', 'admin': 'Admin Dashboard', 'profile': 'Profile',
    'login': 'Authentication', 'create_project': 'Create Project',
    'fraud_dashboard': 'Fraud Detection Center', 'fraud_rules': 'Fraud Rule Configuration'
  };
  return map[currentPage] || 'Page';
};

const NavContent = (user, currentPage) => {
  const navItems = getNavItems(user);
  return `
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center h-16 px-6 border-b border-slate-800 flex-shrink-0 cursor-pointer" data-event="click:handleNavigate" data-params='["landing"]'>
        <div class="h-8 w-8 bg-nexus-500 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <span class="text-slate-900 font-bold text-xl">S</span>
        </div>
        <span class="text-xl font-bold text-white">Nexus</span>
      </div>
      <!-- Nav Links -->
      <nav class="flex-1 px-4 py-4 space-y-2">
        ${navItems.map(item => `
          <button
            data-event="click:handleNavigate" data-params='["${item.id}"]'
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPage === item.id
                ? 'bg-nexus-500/10 text-nexus-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }"
          >
            ${item.icon}
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>
    </div>
  `;
};

export const Layout = ({ user, currentPage, children, notifications = [] }) => {
  // Simple sidebar state management via CSS and a checkbox hack or simple JS
  // For robustness, we'll let index.js handle the state and just render based on it.
  // This layout assumes a mechanism exists outside to toggle sidebar visibility.
  return `
    <div class="flex h-screen bg-slate-900 text-slate-100 font-sans">
      <!-- Desktop Sidebar -->
      <aside class="hidden md:flex md:flex-shrink-0 w-64 bg-slate-900/80 border-r border-slate-800">
        ${NavContent(user, currentPage)}
      </aside>
      
      <div class="flex flex-col flex-1 w-full overflow-hidden">
        <!-- Top Header -->
        <header class="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex-shrink-0">
          <div class="flex items-center justify-between h-16 px-4 sm:px-6">
            <button class="md:hidden p-2 text-slate-400 hover:text-white">
              ${Icons.Menu}
            </button>
            
            <div class="hidden md:flex items-center text-sm text-slate-500">
              <span class="cursor-pointer hover:text-slate-300" data-event="click:handleNavigate" data-params='["landing"]'>Nexus</span>
              ${Icons.ChevronRight}
              <span class="text-nexus-500 font-medium">${getBreadcrumb(currentPage)}</span>
            </div>

            <div class="flex items-center gap-4">
              ${user ? `
                <div class="text-right">
                  <p class="text-sm font-medium text-white">${user.name}</p>
                  <p class="text-xs text-slate-500 uppercase">${user.role.replace('_', ' ')}</p>
                </div>
                <button data-event="click:handleLogout" title="Sign Out" class="p-2 text-slate-400 hover:text-red-400">
                  ${Icons.LogOut()}
                </button>
              ` : `
                <div class="flex gap-2">
                  ${Button({ children: 'Login', variant: 'ghost', size: 'sm', dataEvent: 'click:handleNavigate', additionalParams: '["login"]'})}
                  ${Button({ children: 'Join as Talent', variant: 'primary', size: 'sm', dataEvent: 'click:handleNavigate', additionalParams: '["signup"]'})}
                </div>
              `}
            </div>
          </div>
        </header>

        <div class="overflow-y-auto h-full">
          <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            ${children}
          </main>
          <footer class="bg-slate-900/50 py-6 border-t border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
              <p>© 2024 Somahorse Nexus. Phase: MVP (The Bridge).</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      ${notifications.map(n => Toast(n)).join('')}
    </div>
  `;
};
