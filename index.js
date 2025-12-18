import { Layout } from './components.js';
import * as Pages from './pages.js';

// --- GLOBAL STATE ---
const state = {
  currentPage: 'landing',
  user: null,
  notifications: [],
  // --- Login State ---
  isLoggingIn: false,
  roleSelect: 'TALENT',
  email: '',
  mfaStep: false,
  mfaCode: '',
  userForMfa: null,
};

// --- STATE MANAGEMENT ---
function setState(newState) {
  Object.assign(state, newState);
  render();
}

// --- NOTIFICATIONS ---
function addNotification(type, message) {
  const id = Math.random().toString(36).substr(2, 9);
  const newNotifications = [...state.notifications, { id, type, message }];
  setState({ notifications: newNotifications });
}

function removeNotification(id) {
  const newNotifications = state.notifications.filter(n => n.id !== id);
  setState({ notifications: newNotifications });
}

// --- ROUTING & NAVIGATION ---
function handleNavigate(page) {
  if (!state.user) {
    const publicRoutes = ['landing', 'signup', 'login'];
    if (!publicRoutes.includes(page)) {
      addNotification('error', 'Login required.');
      setState({ currentPage: 'login' });
      return;
    }
  } else {
    const role = state.user.role;
    const talentPages = ['talent_dashboard', 'profile'];
    const clientPages = ['industry', 'profile', 'create_project'];
    const adminPages = ['admin', 'industry', 'fraud_dashboard', 'fraud_rules'];

    let allowed = true;
    if (role === 'TALENT' && !talentPages.includes(page)) allowed = false;
    if (role === 'CLIENT' && !clientPages.includes(page)) allowed = false;
    if ((role === 'ADMIN' || role === 'INTERNAL_STAFF') && !adminPages.includes(page)) allowed = false;
    
    if (!allowed) {
      addNotification('error', 'Forbidden: Access denied.');
      return;
    }
  }
  
  setState({ currentPage: page });
  window.scrollTo(0, 0);
}

// --- AUTHENTICATION ---
import { MOCK_USERS } from './data.js';

function handleLogin(e) {
  e.preventDefault();
  setState({ isLoggingIn: true });

  setTimeout(() => {
    const selectedUser = MOCK_USERS[state.roleSelect.toLowerCase().replace('_', '')];
    
    if (state.roleSelect === 'ADMIN' || state.roleSelect === 'INTERNAL_STAFF') {
      setState({ userForMfa: selectedUser, mfaStep: true, isLoggingIn: false });
    } else {
      setState({ user: selectedUser });
      const landingPage = state.roleSelect === 'TALENT' ? 'talent_dashboard' : 'industry';
      handleNavigate(landingPage);
      addNotification('success', `Welcome back, ${selectedUser.name}!`);
    }
  }, 500);
}

function handleMfaSubmit(e) {
  e.preventDefault();
  setState({ isLoggingIn: true });
  setTimeout(() => {
    if (state.mfaCode === '123456' && state.userForMfa) {
      setState({ user: state.userForMfa, isLoggingIn: false, mfaStep: false, userForMfa: null, mfaCode: '' });
      handleNavigate('admin');
      addNotification('success', `Welcome back, ${state.user.name}!`);
    } else {
      addNotification('error', 'Invalid MFA code.');
      setState({ isLoggingIn: false, mfaCode: '' });
    }
  }, 500);
}

function handleLogout() {
  setState({ user: null, currentPage: 'landing' });
}


// --- DYNAMIC EVENT BINDING ---
// Expose functions to be called from HTML data attributes
const eventHandlers = {
  handleNavigate,
  handleLogout,
  removeNotification,
  handleLogin,
  handleMfaSubmit,
  // Page-specific handlers will be added here by page components
};

function bindEventListeners() {
  document.querySelectorAll('[data-event]').forEach(el => {
    const [eventType, handlerName] = el.dataset.event.split(':');
    const handler = eventHandlers[handlerName];
    if (handler) {
      el.addEventListener(eventType, (e) => {
        const params = el.dataset.params ? JSON.parse(el.dataset.params) : [];
        handler(e, ...params);
      });
    }
  });

  // Bind inputs to state
  document.querySelectorAll('[data-state]').forEach(el => {
    const stateKey = el.dataset.state;
    el.value = state[stateKey] || '';
    el.addEventListener('input', e => {
      state[stateKey] = e.target.value;
    });
  });

  // Run page-specific binding logic
  if (typeof eventHandlers.postRender === 'function') {
      eventHandlers.postRender();
  }
}

// --- RENDER LOGIC ---
function renderPage() {
  const pageMap = {
    landing: Pages.LandingPage,
    signup: Pages.SignupPage,
    login: Pages.LoginPage,
    talent_dashboard: Pages.TalentDashboard,
    industry: Pages.IndustryPortal,
    admin: Pages.AdminDashboard,
    profile: Pages.ProfilePage,
    create_project: Pages.CreateProjectPage,
    fraud_dashboard: Pages.FraudDashboard,
    fraud_rules: Pages.FraudRuleConfiguration,
  };
  
  const pageFunction = pageMap[state.currentPage] || Pages.LandingPage;
  // Pass state, handlers, and a way to register new handlers
  return pageFunction({ state, setState, addNotification, handleNavigate, eventHandlers });
}

function render() {
  const root = document.getElementById('root');
  if (!root) return;

  // Reset page-specific handlers before rendering
  Object.keys(eventHandlers).forEach(key => {
      if (!['handleNavigate', 'handleLogout', 'removeNotification', 'handleLogin', 'handleMfaSubmit'].includes(key)) {
          delete eventHandlers[key];
      }
  });

  const pageHtml = renderPage();
  root.innerHTML = Layout({
    user: state.user,
    currentPage: state.currentPage,
    notifications: state.notifications,
    children: pageHtml,
  });

  bindEventListeners();
}

// --- INITIALIZE APP ---
document.addEventListener('DOMContentLoaded', render);
