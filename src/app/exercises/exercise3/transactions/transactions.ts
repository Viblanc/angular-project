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
  error = signal('');
  sortAscending = signal<boolean>(true);
  sortedColumn = signal<SortedColumn>('id');
  transactions = this.transactionsService.transactions;
  sortedTransactions = computed(() => {
    const sortedCol = this.sortedColumn();
    return this.transactions().sort((a, b) => {
      if (this.sortAscending()) {
        return a[sortedCol] > b[sortedCol] ? 1 : -1;
      } else {
        return a[sortedCol] > b[sortedCol] ? -1 : 1;
      }
    });
  });

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
    if (column === this.sortedColumn()) {
      this.sortAscending.set(!this.sortAscending());
    } else {
      this.sortedColumn.set(column);
    }
  }
}
