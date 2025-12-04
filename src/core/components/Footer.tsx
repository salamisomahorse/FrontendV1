import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 py-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="h-6 w-6 bg-nexus-500 rounded flex items-center justify-center mr-2">
              <span className="text-slate-900 font-bold text-xs">S</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Somahorse Nexus</span>
          </div>
          <p className="text-slate-600 dark:text-slate-500 text-sm max-w-xs">
            Phase: MVP (The Bridge).
            <br />
            Connecting Top African Talent with Industry.
          </p>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-500">
            <li className="hover:text-nexus-500 dark:hover:text-nexus-400 cursor-pointer transition-colors">Talent Search</li>
            <li className="hover:text-nexus-500 dark:hover:text-nexus-400 cursor-pointer transition-colors">Sign Up</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-900 text-center text-slate-600 dark:text-slate-500 text-sm">
        <p>© 2024 Somahorse Nexus. Built with React & Python FastAPI.</p>
      </div>
    </footer>
  );
};


