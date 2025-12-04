import React, { useState } from 'react';
import { User } from '@/core/models';
import { Navbar } from './Navbar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  user,
  onNavigate,
  onLogout,
  currentPage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <Navbar
        user={user}
        currentPage={currentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((open) => !open)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <Breadcrumbs currentPage={currentPage} onNavigate={onNavigate as (page: 'landing') => void} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>

      <Footer />
    </div>
  );
};


