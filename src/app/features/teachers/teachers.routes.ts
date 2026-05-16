import { Routes } from '@angular/router';

export const TEACHERSLAYOUT_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard),
        data: { title: 'dashboard' }
    },
    {
        path: 'standards',
        loadComponent: () => import('./standards/standards').then(c => c.Standards),
        data: { title: 'standards' }
    },
    {
        path: 'student-view',
        loadComponent: () => import('./student-view/student-view').then(c => c.StudentView),
        data: { title: 'student view' }
    },
];
