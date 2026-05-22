import { Routes } from '@angular/router';

export const DISTRICTADMINLAYOUT_ROUTES: Routes = [
  {
    path: 'goal-configuration',
    loadComponent: () => import('./goal-configuration/goal-configuration').then(c => c.GoalConfiguration),
    data: { title: 'Goal Configuration' }
  },
   {
    path: 'school-details',
    loadComponent: () => import('./school-details/school-details').then(c => c.SchoolDetails),
    data: { title: 'School Details' }
  }, 
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard),
    data: { title: 'Dashboard' }
  },
 
];
