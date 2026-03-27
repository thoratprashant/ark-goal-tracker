import { Routes } from '@angular/router';

export const DISTRICTADMINLAYOUT_ROUTES: Routes = [
  {
    path: 'goal-configuration',
    loadComponent: () => import('./goal-configuration/goal-configuration').then(c => c.GoalConfiguration),
    data: { title: 'Goal Configuration' }
  },
 
];
