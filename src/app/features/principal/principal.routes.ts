import { Routes } from '@angular/router';

export const PRINCIPALLAYOUT_ROUTES: Routes = [
  {
    path: 'goal-evaluation',
    loadComponent: () => import('./goal-evaluation/goal-evaluation').then(c => c.GoalEvaluation),
    data: { title: 'goal evaluation' }
  },
  
];
