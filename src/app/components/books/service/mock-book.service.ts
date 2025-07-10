import { computed, Injectable, Signal, signal } from "@angular/core";
import { AbstractBookService } from "./abstract-book.service";
import { Book } from '../model/book.model';
import { OperationResult } from "../../../models/operation-result.model";
import { Observable, of } from "rxjs";

@Injectable()
export class MockBookService extends AbstractBookService{
    // save database
    private _books = signal<Book[]>([
    { id: 1, title: 'Game of Thrones', author: 'George R. R. Martin', year: 1996 },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
    { id: 3, title: 'Harry Pother', author: 'J.K. Rowling', year: 1997 },
  ])
  // object book
  books: Signal<Book[]> = computed(()=> this._books())
  override refresh(): void {
    // Nothen to do
  }

  override add(book: Omit<Book, 'id'>): Observable<OperationResult> {
    try{
        const currentBooks = this._books();
        const maxId = currentBooks.length > 0 ? Math.max(...currentBooks.map((b: Book) => b.id)) : 0;
        const newBook: Book = {...book, id: maxId + 1}
        this._books.update(list=>[...list, newBook])
        return of({success: true, status: 201})
    }catch(error){
        return of({success: false, error, status: 500})
    }
  }

  override remove(id: number): Observable<OperationResult>{
    try{
        this._books.update(list=>list.filter(b=>b.id !== id));
        return of({success: true, status: 200});
    }catch(error){
        return of({success: false, error, status: 500})
    }
  }

  override search(query: any): Observable<OperationResult> {
    try{
      const data = this._books().filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.year.toString().includes(query)
          )
          return of({success: true, data, status: 200});
    }catch(error){
      return of({success: false, error, status: 500});
    }
  }

  override update(book: Book): Observable<OperationResult> {
      return of()
  }
}