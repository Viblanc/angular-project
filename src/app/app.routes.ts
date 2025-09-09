import { Routes } from '@angular/router';
import { Exercise1 } from './exercises/exercise1/exercise1';
import { Exercise2 } from './exercises/exercise2/exercise2';
import { Exercise3 } from './exercises/exercise3/exercise3';
import { ex3Routes } from './exercises/exercise3/ex3.routes';

export const routes: Routes = [
  {
    path: 'ex1',
    component: Exercise1,
  },
  {
    path: 'ex2',
    component: Exercise2,
  },
  {
    path: 'ex3',
    component: Exercise3,
    children: ex3Routes,
  },
];
