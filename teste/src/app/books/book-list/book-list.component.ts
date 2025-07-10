import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import { BookCard } from '../book-card/book-card.component';
import { AbstractBookService } from '../service/abstract-book.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookCard],
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookList {
  private service = inject(AbstractBookService)
  books = this.service.books;
  trackById = (_:number, item: any) => item.id;
  

  async remove(id: number): Promise<void>{
    const result = await firstValueFrom(this.service.remove(id))
  }
}
