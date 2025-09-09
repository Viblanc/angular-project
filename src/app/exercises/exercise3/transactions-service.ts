import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private http = inject(HttpClient);
  private _transactions = signal<Transaction[]>([]);
  transactions = this._transactions.asReadonly();

  loadAllTransactions() {
    return this.http.get<Transaction[]>('/data/transactions.json').pipe(
      tap((next) => this._transactions.set(next)),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to retrieve transactions'));
      })
    );
  }

  fetchTransaction(id: string) {
    return this.http.get<Transaction>(`/data/${id}.json`);
  }
}
