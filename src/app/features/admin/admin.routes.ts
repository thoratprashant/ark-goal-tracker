import { Routes } from '@angular/router'; 

export const ADMINLAYOUT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(c => c.Profile),
    data: { title: 'profile' }
  }, 
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard),
    data: { title: 'dashboard' }
  }, 
  {
    path: 'recent-activity',
    loadComponent: () => import('./recent-activity/recent-activity').then(c => c.RecentActivity),
    data: { title: 'recent-activity' }
  }, 
  {
    path: 'user-managment',
    loadComponent: () => import('./user-managment/user-managment').then(c => c.UserManagment),
    data: { title: 'user-managment' }
  }, 
  {
    path: 'user-profile',
    loadComponent: () => import('./user-profile/user-profile').then(c => c.UserProfile),
    data: { title: 'user-profile' }
  },
    {
    path: 'student-insights',
    loadComponent: () => import('./student-insights/student-insights').then(c => c.StudentInsights),
    data: { title: 'student-insights' }
  },
  
];
 