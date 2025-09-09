import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from '../transactions-service';

const sortedColumns = ['id', 'amount', 'balance', 'label', 'date'] as const;
type SortedColumn = (typeof sortedColumns)[number];

@Component({
  selector: 'app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  sortedColumns = sortedColumns;
  private transactionsService = inject(TransactionsService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  transactions = this.transactionsService.transactions;
  sortedTransactions = computed(() => {
    const sortCol = this.sortColumn();
    return this.transactions().sort((a, b) => {
      if (this.sortAscending()) {
        return a[sortCol] > b[sortCol] ? 1 : -1;
      } else {
        return a[sortCol] > b[sortCol] ? -1 : 1;
      }
    });
  });
  error = signal('');
  sortAscending = signal<boolean>(true);
  sortColumn = signal<SortedColumn>('id');

  ngOnInit() {
    const subscription = this.transactionsService.loadAllTransactions().subscribe({
      error: (err) => {
        this.error.set(err);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  goToTransactionPage(transaction: Transaction) {
    this.router.navigate([transaction.id], { relativeTo: this.route });
  }

  sortTransactions(column: SortedColumn) {
    if (column === this.sortColumn()) {
      this.sortAscending.set(!this.sortAscending());
    } else {
      this.sortColumn.set(column);
    }
  }
}
