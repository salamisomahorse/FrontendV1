import React, { ReactNode, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-nexus-500 text-slate-900 hover:bg-nexus-400 border border-transparent",
    secondary: "bg-slate-700 text-white hover:bg-slate-600 border border-transparent",
    outline: "border border-slate-600 text-slate-300 hover:border-nexus-500 hover:text-nexus-500 bg-transparent",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800 bg-transparent",
    danger: "bg-red-900/50 text-red-200 hover:bg-red-900 border border-red-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm ${onClick ? 'cursor-pointer hover:border-nexus-500 transition-colors' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: ReactNode; color?: 'green' | 'blue' | 'yellow' | 'red' }> = ({ children, color = 'green' }) => {
  const colors = {
    green: "bg-green-900/40 text-green-300 border-green-700/50",
    blue: "bg-blue-900/40 text-blue-300 border-blue-700/50",
    yellow: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
    red: "bg-red-900/40 text-red-300 border-red-700/50",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>}
    <input 
      className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-nexus-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 ${className}`}
      {...props}
    />
  </div>
);

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>}
    <select 
      className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-nexus-500 outline-none transition-all appearance-none ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// --- Skeleton ---
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-800 rounded ${className}`} />
);

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Toast Notification ---
interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  const borders = {
    success: 'border-green-500/50 bg-slate-900',
    error: 'border-red-500/50 bg-slate-900',
    info: 'border-blue-500/50 bg-slate-900',
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${borders[type]} max-w-sm w-full animate-slide-in`}>
      {icons[type]}
      <p className="text-sm font-medium text-slate-200">{message}</p>
      <button onClick={onClose} className="ml-auto text-slate-500 hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
};
