import { Routes } from '@angular/router';
import Forms from './forms/forms';
import Buttons from './buttons/buttons';
import Modal from './modal/modal';

export const routes: Routes = [
  {
    path: 'forms',
    loadComponent: () => Forms
  },
  {
    path: 'buttons',
    loadComponent: () => Buttons
  },
  {
    path: 'modals',
    loadComponent: () => Modal
  }
]
