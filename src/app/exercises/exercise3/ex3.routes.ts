import { Routes } from '@angular/router';
import { TransactionPage } from './transactions/transaction-page/transaction-page';
import { Transactions } from './transactions/transactions';
import { transactionResolver } from './transactions/transaction-resolver';

export const ex3Routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full',
  },
  {
    path: 'transactions',
    component: Transactions,
  },
  {
    path: 'transactions/:id',
    component: TransactionPage,
    resolve: {
      transaction: transactionResolver,
    },
  },
];
