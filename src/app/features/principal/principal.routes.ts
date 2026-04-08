import { Routes } from '@angular/router';

export const PRINCIPALLAYOUT_ROUTES: Routes = [
  {
    path: 'goal-evaluation',
    loadComponent: () => import('./goal-evaluation/goal-evaluation').then(c => c.GoalEvaluation),
    data: { title: 'goal evaluation' }
  },
  {
    path: 'diagnostic-breakdown',
    loadComponent: () => import('./diagnostic-breakdown/diagnostic-breakdown').then(c => c.DiagnosticBreakdown),
    data: { title: 'diagnostic breakdown' }
  },
  {
    path: 'subject-drill-down',
    loadComponent: () => import('./subject-drill-down/subject-drill-down').then(c => c.SubjectDrillDown),
    data: { title: 'subject drill down' }
  },
  
];
