
import React, { ReactNode, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';

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
    outline: "border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white",
    ghost: "text-slate-300 hover:bg-slate-800 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-500 border border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/50 border border-slate-700 rounded-xl ${className}`}>
    {children}
  </div>
);

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, className, ...props }) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1">{label}</label>}
    <input 
      id={id}
      className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-nexus-500 ${error ? 'border-red-500' : 'border-slate-700'} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: ReactNode; color?: 'green' | 'yellow' | 'red' | 'blue' }> = ({ children, color = 'blue' }) => {
  const colors = {
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>{children}</span>;
};

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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Toast ---
interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}
export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-green-400" />,
    error: <AlertCircle className="text-red-400" />,
    info: <Info className="text-blue-400" />,
  };

  return (
    <div className="max-w-sm w-full bg-slate-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden border border-slate-700 animate-fade-in">
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onClose} className="inline-flex text-slate-400 hover:text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Skeleton ---
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-slate-700 animate-pulse rounded-md ${className}`} />
);

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}
export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => (
  <div>
    {label && <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>}
    <select {...props} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-nexus-500">
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

// --- ToggleSwitch ---
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  isLoading?: boolean;
}
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, isLoading }) => {
  return (
    <button
      type="button"
      className={`${enabled ? 'bg-nexus-500' : 'bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-nexus-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50`}
      role="switch"
      aria-checked={enabled}
      onClick={() => !isLoading && onChange(!enabled)}
      disabled={isLoading}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      >
        {isLoading && <Loader2 className="h-5 w-5 text-slate-600 animate-spin p-1" />}
      </span>
    </button>
  );
};
