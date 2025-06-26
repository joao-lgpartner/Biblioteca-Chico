import { Component, Input } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-book-card',
  imports: [],
  standalone: true,
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCard {
  @Input() book!: {
    title: string;
    author: string;
    year: number;
  }
  message = 'Hello World!!!';
}
