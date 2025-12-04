import React, { ReactNode, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// --- shared types & style maps ---
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

const BUTTON_BASE_STYLES =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-500 disabled:opacity-50 disabled:cursor-not-allowed';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-nexus-500 text-slate-900 hover:bg-nexus-400 border border-transparent dark:bg-nexus-500 dark:text-slate-900 dark:hover:bg-nexus-400',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 border border-transparent dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
  outline:
    'border border-slate-300 text-slate-700 hover:border-nexus-500 hover:text-nexus-500 bg-transparent dark:border-slate-600 dark:text-slate-300 dark:hover:border-nexus-500 dark:hover:text-nexus-500',
  ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-transparent dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900 dark:border-red-800',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

// --- Button ---
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  return (
    <button
      className={`${BUTTON_BASE_STYLES} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

// --- Card ---
export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm dark:bg-slate-800 dark:border-slate-700 ${
      onClick ? 'cursor-pointer hover:border-nexus-500 transition-colors' : ''
    } ${className}`}
  >
    {children}
  </div>
);

// --- Badge ---
type BadgeColor = 'green' | 'blue' | 'yellow' | 'red';

export interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
}

const BADGE_COLORS: Record<BadgeColor, string> = {
  green: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700/50',
  blue: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/50',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700/50',
  red: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700/50',
};

export const Badge: React.FC<BadgeProps> = ({ children, color = 'green' }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${BADGE_COLORS[color]}`}
  >
    {children}
  </span>
);

// --- Input ---
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', error, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>}
    <input
      className={`w-full bg-white border rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-nexus-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600 ${
        error ? 'border-red-500 dark:border-red-500' : 'border-slate-300 dark:border-slate-700'
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

// --- Select ---
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>}
    <select
      className={`w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-nexus-500 outline-none transition-all appearance-none dark:bg-slate-900 dark:border-slate-700 dark:text-white ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// --- Skeleton ---
export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
);

// --- Modal ---
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl transform transition-all dark:bg-slate-900 dark:border-slate-700">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Toast Notification ---
export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const TOAST_ICONS: Record<ToastType, JSX.Element> = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
};

const TOAST_BORDERS: Record<ToastType, string> = {
  success: 'border-green-500/50 bg-white dark:bg-slate-900',
  error: 'border-red-500/50 bg-white dark:bg-slate-900',
  info: 'border-blue-500/50 bg-white dark:bg-slate-900',
};

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${TOAST_BORDERS[type]} max-w-sm w-full animate-slide-in`}
    >
      {TOAST_ICONS[type]}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{message}</p>
      <button onClick={onClose} className="ml-auto text-slate-500 hover:text-slate-700 dark:hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
};


