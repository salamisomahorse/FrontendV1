import React from 'react';
import { Button } from '@/shared/components';
import { User } from '@/core/models';
import { useTheme } from '@/core/contexts/ThemeContext';
import {
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  Globe,
  LogOut,
  User as UserIcon,
  Sun,
  Moon,
} from 'lucide-react';

type NavItemId = 'landing' | 'engineer_dashboard' | 'profile' | 'industry' | 'admin';

interface NavbarProps {
  user: User | null;
  currentPage: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (page: NavItemId | 'login' | 'signup') => void;
  onLogout: () => void;
}

const getNavItems = (user: User | null) => {
  if (!user) return [{ id: 'landing' as NavItemId, label: 'Home', icon: Globe }];

  switch (user.role) {
    case 'ENGINEER':
      return [
        { id: 'engineer_dashboard' as NavItemId, label: 'Workspace', icon: LayoutDashboard },
        { id: 'profile' as NavItemId, label: 'My Profile', icon: UserIcon },
      ];
    case 'CLIENT':
      return [
        { id: 'industry' as NavItemId, label: 'Find Talent', icon: Briefcase },
        { id: 'profile' as NavItemId, label: 'Company Profile', icon: UserIcon },
      ];
    case 'ADMIN':
      return [{ id: 'admin' as NavItemId, label: 'Admin Panel', icon: LayoutDashboard }];
    default:
      return [{ id: 'landing' as NavItemId, label: 'Home', icon: Globe }];
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentPage,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  onLogout,
}) => {
  const navItems = getNavItems(user);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="h-8 w-8 bg-nexus-500 rounded-lg flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <span className="text-slate-900 font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
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
                      ? 'bg-slate-100 text-nexus-500 dark:bg-slate-800 dark:text-nexus-400 shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
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
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 uppercase">{user.role}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onLogout} title="Sign Out">
                    <LogOut size={18} />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onNavigate('login')}>
                    Login
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => onNavigate('signup')}>
                    Join as Engineer
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={onToggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 pb-3 px-2 pt-2 shadow-lg border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onToggleMobileMenu();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentPage === item.id
                  ? 'bg-slate-100 text-nexus-500 dark:bg-slate-900 dark:text-nexus-400'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon size={18} />
                {item.label}
              </div>
            </button>
          ))}
          {!user ? (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2">
              <Button className="w-full" onClick={() => onNavigate('login')}>
                Login
              </Button>
              <Button className="w-full" variant="outline" onClick={() => onNavigate('signup')}>
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400"
                onClick={onLogout}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};


