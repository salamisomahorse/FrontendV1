
import React, { useState } from 'react';
import { Layout, Card, Button, Input, Toast } from '@/shared/components';
import { User, UserRole, Notification } from '@/core/models';
import {
  LandingPage,
  SignupPage,
  EngineerDashboard,
  IndustryPortal,
  AdminDashboard,
  ProfilePage,
  CreateProjectPage,
} from '@/features';
import {
  AppRouteId,
  PROTECTED_ROUTES,
  ADMIN_ROUTES,
  CLIENT_ONLY_ROUTES,
} from '@/app/navigation/routes';

const MOCK_USERS: Record<string, User> = {
  engineer: { 
    id: '1', name: 'John Doe', email: 'john@nexus.africa', role: 'ENGINEER',
    skills: ['Python', 'FastAPI'], resume: 'john_cv.pdf'
  },
  client: { id: '2', name: 'Tech Corp', email: 'cto@techcorp.com', role: 'CLIENT' },
  admin: { id: '3', name: 'Admin', email: 'admin@nexus.africa', role: 'ADMIN' },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppRouteId>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [roleSelect, setRoleSelect] = useState<UserRole>('ENGINEER');
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNavigate = (page: AppRouteId | string) => {
    const target = page as AppRouteId;

    if (PROTECTED_ROUTES.includes(target) && !user) {
      addNotification('error', 'Login required.');
      setCurrentPage('login');
      return;
    }

    if (ADMIN_ROUTES.includes(target) && user?.role !== 'ADMIN') {
      addNotification('error', 'Unauthorized.');
      return;
    }

    if (CLIENT_ONLY_ROUTES.includes(target) && user?.role !== 'CLIENT') {
        addNotification('error', 'Only Clients can create projects.');
        return;
    }

    setCurrentPage(target);
    window.scrollTo(0, 0);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      if (roleSelect === 'ENGINEER') {
        setUser(MOCK_USERS.engineer);
        handleNavigate('engineer_dashboard');
      } else if (roleSelect === 'CLIENT') {
        setUser(MOCK_USERS.client);
        handleNavigate('industry');
      } else if (roleSelect === 'ADMIN') {
        setUser(MOCK_USERS.admin);
        handleNavigate('admin');
      }
      addNotification('success', `Welcome back, ${MOCK_USERS[roleSelect.toLowerCase() as keyof typeof MOCK_USERS].name}!`);
    }, 500);
  };

  const renderPage = () => {
    if (currentPage === 'login') {
      return (
        <div className="flex justify-center items-center py-20 animate-fade-in">
          <Card className="w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Nexus Portal Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                placeholder="Email" 
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
                  <option value="ENGINEER">AI Engineer</option>
                  <option value="CLIENT">Industry Partner</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <Button className="w-full" type="submit" isLoading={isLoggingIn}>Sign In</Button>
            </form>
             <div className="mt-4 text-center">
              <span className="text-slate-500 text-sm">Don't have an account? </span>
              <button onClick={() => handleNavigate('signup')} className="text-nexus-400 text-sm hover:underline">
                Join as Engineer
              </button>
            </div>
          </Card>
        </div>
      );
    }

    switch (currentPage) {
      case 'landing': return <LandingPage onNavigate={handleNavigate} />;
      case 'signup': return <SignupPage onSignupSuccess={(u) => { setUser(u); handleNavigate('engineer_dashboard'); }} onNavigate={handleNavigate} />;
      case 'engineer_dashboard': return <EngineerDashboard onNotify={addNotification} />;
      case 'industry': return <IndustryPortal onNotify={addNotification} onNavigate={handleNavigate} />;
      case 'admin': return <AdminDashboard />;
      case 'profile': return <ProfilePage user={user} onUpdateUser={(d: Partial<User>) => user && setUser({ ...user, ...d })} onNotify={addNotification} />;
      case 'create_project': return <CreateProjectPage onNavigate={handleNavigate} onNotify={addNotification} />;
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