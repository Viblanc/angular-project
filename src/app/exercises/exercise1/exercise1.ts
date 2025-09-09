import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise1',
  imports: [FormsModule],
  templateUrl: './exercise1.html',
  styleUrl: './exercise1.css',
})
export class Exercise1 {
  name = signal<string>('');
  message = computed(() => `Hello ${this.name().toUpperCase()}!`);
  fontSize = signal<number>(24);
  fonts = ['Roboto', 'Open Sans', 'Montserrat', 'Oswald'];
  selectedFont = signal<'Roboto' | 'Open Sans' | 'Montserrat' | 'Oswald'>('Roboto');
  selectedAlignment = signal<'left' | 'center' | 'right'>('left');
}
