import { Routes } from '@angular/router'; 

export const ADMINLAYOUT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(c => c.Profile),
    data: { title: 'profile' }
  }, 
  {
    path: 'user-managment',
    loadComponent: () => import('./user-managment/user-managment-listing/user-managment-listing').then(c => c.UserManagmentListing), 
  },
];
 