import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const fonts = ['Roboto', 'Open Sans', 'Montserrat', 'Oswald'] as const;
type Fonts = (typeof fonts)[number];

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
  fonts = fonts;
  selectedFont = signal<Fonts>('Roboto');
  selectedAlignment = signal<'left' | 'center' | 'right'>('left');
}
