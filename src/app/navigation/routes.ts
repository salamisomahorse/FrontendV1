export type AppRouteId =
  | 'landing'
  | 'login'
  | 'signup'
  | 'engineer_dashboard'
  | 'industry'
  | 'admin'
  | 'profile'
  | 'create_project';

export const PROTECTED_ROUTES: AppRouteId[] = [
  'engineer_dashboard',
  'profile',
  'create_project',
];

export const ADMIN_ROUTES: AppRouteId[] = ['admin'];

export const CLIENT_ONLY_ROUTES: AppRouteId[] = ['create_project'];


