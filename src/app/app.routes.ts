import { Routes } from '@angular/router';
import MainLayoutComponent from './layouts/main-layout-component/main-layout-component';
import AuthLayoutComponent from './layouts/auth-layout-component/auth-layout-component';
import featureRoutes from './features/routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainLayoutComponent,
    loadChildren: () => featureRoutes,
  },
  {
    path: 'auth',
    loadComponent: () => AuthLayoutComponent,
  }
];
