
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignupPage';
import { TalentDashboard } from './pages/ScholarDashboard'; 
import { IndustryPortal } from './pages/IndustryPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { FraudDashboard } from './pages/FraudDashboard';
import { FraudRuleConfiguration } from './pages/FraudRuleConfiguration';
import { User, UserRole, Notification } from './types';
import { Card, Button, Input, Toast } from './components/UI';

const MOCK_USERS: Record<string, User> = {
  talent: { 
    id: '1', name: 'John Doe', email: 'john@nexus.africa', role: 'TALENT',
    skills: ['Python', 'FastAPI'], resume: 'john_cv.pdf', phone: '+254712345678'
  },
  client: { id: '2', name: 'Tech Corp', email: 'cto@techcorp.com', role: 'CLIENT' },
  admin: { id: '3', name: 'Admin User', email: 'admin@nexus.africa', role: 'ADMIN' },
  internal_staff: { id: '4', name: 'Staff Member', email: 'staff@nexus.africa', role: 'INTERNAL_STAFF' },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [roleSelect, setRoleSelect] = useState<UserRole>('TALENT');
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [userForMfa, setUserForMfa] = useState<User | null>(null);


  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNavigate = (page: string) => {
    if (!user) {
       const publicRoutes = ['landing', 'signup', 'login'];
       if (!publicRoutes.includes(page)) {
          addNotification('error', 'Login required.');
          setCurrentPage('login');
          return;
       }
    } else {
        // Enforce RBAC
        const role = user.role;
        const talentPages = ['talent_dashboard', 'profile'];
        const clientPages = ['industry', 'profile', 'create_project'];
        const adminPages = ['admin', 'industry', 'fraud_dashboard', 'fraud_rules'];

        if (role === 'TALENT' && !talentPages.includes(page)) {
            addNotification('error', 'Forbidden: Access denied.');
            return;
        }
        if (role === 'CLIENT' && !clientPages.includes(page)) {
            addNotification('error', 'Forbidden: Access denied.');
            return;
        }
        if ((role === 'ADMIN' || role === 'INTERNAL_STAFF') && !adminPages.includes(page)) {
            addNotification('error', 'Forbidden: Access denied.');
            return;
        }
    }

    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    setTimeout(() => {
      setIsLoggingIn(false);
      const selectedUser = MOCK_USERS[roleSelect.toLowerCase().replace('_', '') as keyof typeof MOCK_USERS];

      if (roleSelect === 'ADMIN' || roleSelect === 'INTERNAL_STAFF') {
        setUserForMfa(selectedUser);
        setMfaStep(true);
      } else {
        setUser(selectedUser);
        const landingPage = roleSelect === 'TALENT' ? 'talent_dashboard' : 'industry';
        handleNavigate(landingPage);
        addNotification('success', `Welcome back, ${selectedUser.name}!`);
      }
    }, 500);
  };
  
  const handleMfaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoggingIn(true);
      setTimeout(() => {
          setIsLoggingIn(false);
          // Mocking MFA code validation
          if (mfaCode === '123456' && userForMfa) {
              setUser(userForMfa);
              handleNavigate('admin');
              addNotification('success', `Welcome back, ${userForMfa.name}!`);
              setMfaStep(false);
              setUserForMfa(null);
          } else {
              addNotification('error', 'Invalid MFA code.');
          }
          setMfaCode('');
      }, 500);
  }

  const renderPage = () => {
    if (currentPage === 'login') {
      return (
        <div className="flex justify-center items-center py-20 animate-fade-in">
          <Card className="w-full max-w-md p-8">
            {mfaStep ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Two-Factor Authentication</h2>
                <p className="text-center text-slate-400 text-sm mb-6">Enter the code from your authenticator app.</p>
                <form onSubmit={handleMfaSubmit} className="space-y-4">
                  <Input 
                    placeholder="6-digit code" 
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    maxLength={6}
                  />
                  <Button className="w-full" type="submit" isLoading={isLoggingIn}>Verify</Button>
                  <Button className="w-full" variant="ghost" onClick={() => setMfaStep(false)}>Back to Login</Button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Nexus Portal Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input 
                    placeholder="Email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-400">Select Role</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                      value={roleSelect}
                      onChange={(e) => setRoleSelect(e.target.value as UserRole)}
                    >
                      <option value="TALENT">AI Talent</option>
                      <option value="CLIENT">Industry Partner</option>
                      <option value="ADMIN">Admin</option>
                      <option value="INTERNAL_STAFF">Internal Staff</option>
                    </select>
                  </div>
                  <Button className="w-full" type="submit" isLoading={isLoggingIn}>Sign In</Button>
                </form>
                 <div className="mt-4 text-center">
                  <span className="text-slate-500 text-sm">Don't have an account? </span>
                  <button onClick={() => handleNavigate('signup')} className="text-nexus-400 text-sm hover:underline">
                    Join as Talent
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>
      );
    }

    switch (currentPage) {
      case 'landing': return <LandingPage onNavigate={handleNavigate} />;
      case 'signup': return <SignupPage onSignupSuccess={(u) => { setUser(u); handleNavigate('talent_dashboard'); }} onNavigate={handleNavigate} />;
      case 'talent_dashboard': return <TalentDashboard onNotify={addNotification} />;
      case 'industry': return <IndustryPortal onNotify={addNotification} onNavigate={handleNavigate} />;
      case 'admin': return <AdminDashboard />;
      case 'profile': return <ProfilePage user={user} onUpdateUser={(d) => user && setUser({...user, ...d})} onNotify={addNotification} />;
      case 'create_project': return <CreateProjectPage onNavigate={handleNavigate} onNotify={addNotification} />;
      case 'fraud_dashboard': return <FraudDashboard onNotify={addNotification} />;
      case 'fraud_rules': return <FraudRuleConfiguration onNotify={addNotification} />;
      default: return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout user={user} onNavigate={handleNavigate} onLogout={() => { setUser(null); handleNavigate('landing'); }} currentPage={currentPage}>
      {renderPage()}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map(n => (
          <Toast key={n.id} type={n.type} message={n.message} onClose={() => removeNotification(n.id)} />
        ))}
      </div>
    </Layout>
  );
}
