import { Routes } from '@angular/router';
import MainLayoutComponent from './layouts/main-layout-component/main-layout-component';
import AuthLayoutComponent from './layouts/auth-layout-component/auth-layout-component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainLayoutComponent,
    loadChildren: () => import('./dashboard-features/routes').then(m => m.routes),
  },
  {
    path: 'auth',
    loadComponent: () => AuthLayoutComponent,
  }
];
