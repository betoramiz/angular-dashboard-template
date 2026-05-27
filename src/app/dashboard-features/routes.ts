import { Routes } from '@angular/router';
import Forms from './forms/forms';

export const routes: Routes = [
  {
    path: 'simple-form',
    loadComponent: () => Forms
  }
]
