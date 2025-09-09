import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  date = signal<Date>(new Date());
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = interval(1000)
      .pipe(map(() => new Date()))
      .subscribe({
        next: (date) => {
          this.date.set(date);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
