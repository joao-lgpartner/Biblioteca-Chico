import { Injectable, signal, computed } from '@angular/core';
import { Signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractBookService } from './abstract-book.service';
import { Book } from '../model/book.model';
import { OperationResult } from '../../models/operation-result.model';

@Injectable()
export class MockBookService extends AbstractBookService{
    //save database
    private _books = signal<Book[]>([
        {id: 1, title: 'Clean Code', author: 'Robert Martin', year: 2008},
        {id: 2, title: 'Harry Potter', author: 'J. K. Rowling', year: 1997},
        {id: 3, title: 'O Senhor dos Aneis', author: 'J. R. Tolkien', year: 1954},
      ])
      //object Book
      books: Signal<Book[]> = computed(()=>this._books())
      
      override refresh(): void {
          // Nada a fazer
      }

      override add(book: Omit<Book, 'id'>): Observable<OperationResult> {
          try{
                const currentBooks = this._books();
                const maxId = currentBooks.length > 0 
                    ? Math.max(...currentBooks.map((b: Book) => b.id)) : 0;
                const newBook: Book = {...book, id: maxId+1}
                this._books.update(list=>[...list, newBook])
                return of({success: true, status: 201})
            }catch(error){
                return of({success: false, error, status: 500})
            }
        }

        override update(book: Book): Observable<OperationResult> {
            try {
                let updated = false;
                this._books.update(list => 
                    list.map(b => {
                        if (b.id === book.id) {
                            updated = true;
                            return { ...book }
                        }
                        return b
                    })
                );
                if (updated) {
                    return of({ success: true, status: 200 });
                } else {
                    return of({ success: false, status: 304, data: "Error to update Book" });
                }
            } catch (error) {
                return of({ success: false, status: 500, data: error });
            }
        }

        override remove(id: number): Observable<OperationResult>{
            try{
                this._books.update(list=>list.filter((b: Book)=>b.id !== id))
                return of({success: true, status: 200})
            }catch(error){
                return of({success: false,error, status:500})
            }
        }

        override search(query: string): Observable<OperationResult> {
            try {
                const lowerQuery = query.trim().toLowerCase();

                const filtered = this._books().filter(book =>
                    book.title.toLowerCase().includes(lowerQuery) ||
                    book.author.toLowerCase().includes(lowerQuery) ||
                    book.year.toString().toLowerCase().includes(lowerQuery)
                )

                return of({success: true, status: 200, data: filtered});

            } catch (error) {
                return of({success: false, status:500});
            }
        }

        override searchById(id: number): Observable<OperationResult> {
            try {
                const found = this._books().find(book => book.id === id);
                if (found){
                    return of({success: true, status: 200, data: found});
                }else{
                    return of({success: false, status: 404, data: "Book does'nt found"});
                }
            }catch (error) {
                return of({success: false, status: 500, data: error});
            }
        }
}