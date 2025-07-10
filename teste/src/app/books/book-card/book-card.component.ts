import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  imports: [],
  standalone : true,
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCard {
  /*book = {title: "Game of thrones",
          author: "Georgie",
          year: 2015}*/
  

  @Input() book!: {
    title: string;
    author: string;
    year: number
  };

  message = 'Hello World!!!'
}
