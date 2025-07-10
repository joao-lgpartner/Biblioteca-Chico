import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AbstractBookService } from '../service/abstract-book.service';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchQuery = '';
  searchResultList: Book[] = [];

  private service = inject(AbstractBookService);
  books = this.service.books;
  trackById = (_: number, item: any) => item.id;

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.updateSearchResults(query);
  }

  updateSearchResults(query: string) {
    this.service.search(query).subscribe(result => {
      if (result.success){
        this.searchResultList = result.data
      }else{
        this.searchResultList = [];
      }
    });
  }

  searchResults(): Book[] {
    return this.searchResultList;
  }
}
