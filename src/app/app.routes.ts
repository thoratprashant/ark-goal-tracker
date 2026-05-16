import { Routes } from '@angular/router';  

export const routes: Routes = [ 
{
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    loadChildren: () =>  import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
  }, 
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(c => c.AdminLayout),
    loadChildren: () =>  import('./features/admin/admin.routes').then(r => r.ADMINLAYOUT_ROUTES),
  },
  {
    path: 'principal',
    loadComponent: () => import('./layouts/principal-layout/principal-layout').then(c => c.PrincipalLayout),
    loadChildren: () =>  import('./features/principal/principal.routes').then(r => r.PRINCIPALLAYOUT_ROUTES),
  }, 
  {
    path: 'district-admin',
    loadComponent: () => import('./layouts/district-admin-layout/district-admin-layout').then(c => c.DistrictAdminLayout),
    loadChildren: () =>  import('./features/district-admin/district-admin.routes').then(r => r.DISTRICTADMINLAYOUT_ROUTES),
  },
  {
    path: 'teachers',
    loadComponent: () => import('./layouts/teachers-layout/teachers-layout').then(c => c.TeachersLayout),
    loadChildren: () =>  import('./features/teachers/teachers.routes').then(r => r.TEACHERSLAYOUT_ROUTES),
  },
];
