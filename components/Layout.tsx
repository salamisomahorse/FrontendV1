

import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './UI';
import { Menu, X, LayoutDashboard, Briefcase, Globe, LogOut, ChevronRight, User as UserIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onNavigate, onLogout, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      'login': 'Authentication'
    };
    return map[currentPage] || 'Page';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="h-8 w-8 bg-nexus-500 rounded-lg flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <span className="text-slate-900 font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Somahorse Nexus
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                      currentPage === item.id
                        ? 'bg-slate-800 text-nexus-400 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 uppercase">{user.role.replace('_', ' ')}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onLogout} title="Sign Out">
                    <LogOut size={18} />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('login')}>Login</Button>
                  <Button variant="primary" size="sm" onClick={() => onNavigate('signup')}>Join as Talent</Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 pb-3 px-2 pt-2 shadow-lg border-b border-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id ? 'bg-slate-900 text-nexus-400' : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon size={18} />
                  {item.label}
                </div>
              </button>
            ))}
            {!user ? (
               <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col gap-2">
                 <Button className="w-full" onClick={() => onNavigate('login')}>Login</Button>
                 <Button className="w-full" variant="outline" onClick={() => onNavigate('signup')}>Sign Up</Button>
               </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-slate-700">
                 <Button variant="ghost" className="w-full justify-start text-red-400" onClick={onLogout}>Sign Out</Button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-slate-500">
            <span className="cursor-pointer hover:text-slate-300" onClick={() => onNavigate('landing')}>Nexus</span>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-nexus-500 font-medium">{getBreadcrumb()}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center mb-4">
              <div className="h-6 w-6 bg-nexus-500 rounded flex items-center justify-center mr-2">
                <span className="text-slate-900 font-bold text-xs">S</span>
              </div>
              <span className="text-lg font-bold text-white">Somahorse Nexus</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Phase: MVP (The Bridge).<br/>
              Connecting Top African Talent with Industry.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-nexus-400 cursor-pointer">Talent Search</li>
              <li className="hover:text-nexus-400 cursor-pointer">Sign Up</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          <p>© 2024 Somahorse Nexus. Built with React & Python FastAPI.</p>
        </div>
      </footer>
    </div>
  );
};
