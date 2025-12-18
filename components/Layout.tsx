
import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './UI';
import { Menu, X, LayoutDashboard, Briefcase, Globe, LogOut, ChevronRight, User as UserIcon, ShieldAlert, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onNavigate, onLogout, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = () => {
    if (!user) return [{ id: 'landing', label: 'Home', icon: Globe }];
    
    switch (user.role) {
      case 'TALENT':
        return [
          { id: 'talent_dashboard', label: 'Workspace', icon: LayoutDashboard },
          { id: 'profile', label: 'My Profile', icon: UserIcon },
        ];
      case 'CLIENT':
        return [
          { id: 'industry', label: 'Find Talent', icon: Briefcase },
          { id: 'profile', label: 'Company Profile', icon: UserIcon },
        ];
      case 'ADMIN':
      case 'INTERNAL_STAFF':
        return [
          { id: 'admin', label: 'Admin Panel', icon: LayoutDashboard },
          { id: 'industry', label: 'Industry Portal', icon: Briefcase },
          { id: 'fraud_dashboard', label: 'Fraud Center', icon: ShieldAlert },
          { id: 'fraud_rules', label: 'Rule Configuration', icon: Settings },
        ];
      default:
        return [{ id: 'landing', label: 'Home', icon: Globe }];
    }
  };

  const navItems = getNavItems();

  const getBreadcrumb = () => {
    const map: Record<string, string> = {
      'landing': 'Home',
      'signup': 'Talent Registration',
      'talent_dashboard': 'Talent Workspace',
      'industry': 'Industry Portal',
      'admin': 'Admin Dashboard',
      'profile': 'Profile',
      'login': 'Authentication',
      'create_project': 'Create Project',
      'fraud_dashboard': 'Fraud Detection Center',
      'fraud_rules': 'Fraud Rule Configuration'
    };
    return map[currentPage] || 'Page';
  };

  const NavContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-slate-800 flex-shrink-0 cursor-pointer" onClick={() => onNavigate('landing')}>
        <div className="h-8 w-8 bg-nexus-500 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <span className="text-slate-900 font-bold text-xl">S</span>
        </div>
        <span className="text-xl font-bold text-white">Nexus</span>
      </div>
      {/* Nav Links */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { onNavigate(item.id); if (isMobile) setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentPage === item.id
                ? 'bg-nexus-500/10 text-nexus-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      {/* Footer / Auth section for mobile */}
      {isMobile && (
        <div className="px-4 py-4 border-t border-slate-800">
           {!user ? (
             <div className="flex flex-col gap-2">
               <Button className="w-full" onClick={() => onNavigate('login')}>Login</Button>
               <Button className="w-full" variant="outline" onClick={() => onNavigate('signup')}>Sign Up</Button>
             </div>
           ) : (
             <Button variant="ghost" className="w-full justify-start text-red-400" onClick={onLogout}><LogOut size={16} className="mr-2"/> Sign Out</Button>
           )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Mobile Sidebar (Overlay) */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity ${isSidebarOpen ? 'bg-black/60' : 'pointer-events-none opacity-0'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NavContent isMobile={true} />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0 w-64 bg-slate-900/80 border-r border-slate-800">
        <NavContent />
      </aside>
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            
            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center text-sm text-slate-500">
              <span className="cursor-pointer hover:text-slate-300" onClick={() => onNavigate('landing')}>Nexus</span>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-nexus-500 font-medium">{getBreadcrumb()}</span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 uppercase">{user.role.replace('_', ' ')}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onLogout} title="Sign Out">
                    <LogOut size={18} />
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('login')}>Login</Button>
                  <Button variant="primary" size="sm" onClick={() => onNavigate('signup')}>Join as Talent</Button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content & Footer */}
        <div className="overflow-y-auto h-full">
          <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          {/* Footer */}
          <footer className="bg-slate-900/50 py-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
              <p>© 2024 Somahorse Nexus. Phase: MVP (The Bridge).</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
