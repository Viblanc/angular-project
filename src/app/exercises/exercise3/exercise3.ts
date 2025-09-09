import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-exercise3',
  imports: [CommonModule, RouterOutlet, Header],
  templateUrl: './exercise3.html',
  styleUrl: './exercise3.css',
})
export class Exercise3 {}
