import{ environment } from '../../../../environments/environments'
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { AbstractBookService } from './abstract-book.service';
import { Book } from '../model/book.model';
import { OperationResult } from '../../models/operation-result.model';

@Injectable()
export class BookService extends AbstractBookService{
    private _books = signal<Book[]>([]);

    books = computed(()=>this._books());

    constructor(private http: HttpClient){
        super();
        this.refresh();
    }

    override refresh(): void {
        this.http.get<Book[]>(`${environment.apiUrl}/books`)
        .subscribe(data => this._books.set(data));
    }

    override add(book: Omit<Book, 'id'>) {
        return of()
    }
    override remove(id: number) {
        return of()
    }

    override update(book: Book) {
        return of()       
    }

    override search(query: string){
        return of()
    }

    override searchById(id: number){
        return of()
    }    
}