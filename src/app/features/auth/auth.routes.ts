import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    data: { title: 'Login' }
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password').then(c => c.ForgotPasswordComponent),
  },
  {
    path: 'verification-code',
    loadComponent: () => import('./verification-code/verification-code').then(c => c.VerificationCode),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then(c => c.ResetPassword),
  },
  {
    path: 'set-password',
    loadComponent: () => import('./set-password/set-password').then(c => c.SetPassword),
  },
];
