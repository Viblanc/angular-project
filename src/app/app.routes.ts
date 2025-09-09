import { Routes } from '@angular/router';
import { Exercise1 } from './exercises/exercise1/exercise1';
import { Exercise2 } from './exercises/exercise2/exercise2';

export const routes: Routes = [
  {
    path: 'ex1',
    component: Exercise1,
  },
  {
    path: 'ex2',
    component: Exercise2,
  },
];
