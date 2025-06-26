import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookList } from '../../components/books/book-list/book-list.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BookList],
  templateUrl: './home.components.html',
  styleUrl: './home.components.scss'
})
export class Home {
  searchQuery = ''

  onSearchChange(query: string){
    this.searchQuery = query;
    console.log(query);
  }
}
