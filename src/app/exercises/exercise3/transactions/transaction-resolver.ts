import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TransactionsService } from '../transactions-service';

export const transactionResolver: ResolveFn<Transaction> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const transactionsService = inject(TransactionsService);
  const id = route.paramMap.get('id')!;

  return transactionsService.fetchTransaction(id);
};
