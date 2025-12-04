import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  currentPage: string;
  onNavigate: (page: 'landing') => void;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  landing: 'Home',
  signup: 'Talent Registration',
  engineer_dashboard: 'Engineer Workspace',
  industry: 'Industry Portal',
  admin: 'Admin Dashboard',
  profile: 'Profile',
  login: 'Authentication',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage, onNavigate }) => {
  const label = BREADCRUMB_LABELS[currentPage] ?? 'Page';

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-500">
          <span
            className="cursor-pointer hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
            onClick={() => onNavigate('landing')}
          >
            Nexus
          </span>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-nexus-500 dark:text-nexus-400 font-medium">{label}</span>
        </div>
      </div>
    </div>
  );
};


