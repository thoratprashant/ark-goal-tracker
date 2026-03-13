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
    data: { title: 'dashboard' }
  }, 
  
];
 