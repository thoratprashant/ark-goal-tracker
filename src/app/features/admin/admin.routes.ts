import { Routes } from '@angular/router'; 

export const ADMINLAYOUT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(c => c.Profile),
    data: { title: 'profile' }
  }, 
  
];
 