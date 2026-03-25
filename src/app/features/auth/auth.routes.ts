import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    data: { title: 'Login' }
  }, 
  {
    path: 'admin-login',
    loadComponent: () => import('./admin-login/admin-login.component').then(c => c.AdminLoginComponent),
    data: { title: 'Admin Login' }
  }, 
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password').then(c => c.ForgotPasswordComponent),
  }, 
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then(c => c.ResetPassword),
  }
];
