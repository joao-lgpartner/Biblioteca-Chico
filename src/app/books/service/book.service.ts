import{ environment } from '../../../../environments/environments'
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { AbstractBookService } from './abstract-book.service';
import { Book } from '../model/book.model';
import { OperationResult } from '../../models/operation-result.model';
import { stat } from 'node:fs';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class BookService extends AbstractBookService{
    private _books = signal<Book[]>([]);

    books = computed(()=>this._books());

    constructor(private http: HttpClient, private authService: AuthService) {
        super();
        this.refresh();
    }

    override refresh(): void {
        this.http.get<Book[]>(`${environment.apiUrl}/book/list`, {observe: 'response', headers: {Authorization: `Bearer ${this.authService.token}`}})
        .subscribe(response => {
            if(response.status === 200 && response.body){
                this._books.set(response.body)
            }
        });
    }

    override add(book: Omit<Book, 'id'>): Observable<OperationResult> {
        const user_id = 1;
        return this.http.post<Book>(
            `${environment.apiUrl}/book/${user_id}`,
            book,
            {observe: 'response'} //capturar o corpo + metadados
        ).pipe(
            map(response => ({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status,
            })),
            catchError((error: HttpErrorResponse) => of({
                success: false,
                status: error.status,
                data: error.message
            }))
        )
    }
    override remove(id: number) {
        const user_id = 1;
        return this.http.delete(
            `${environment.apiUrl}/book/${id}`,
            {observe: 'response'} //capturar o corpo + metadados
        ).pipe(
            map(response => ({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status,
            })),
            catchError((error: HttpErrorResponse) => of({
                success: false,
                status: error.status,
                data: error.message
            }))
        )
    }

    override update(book: Book): Observable<OperationResult> {
        console.log(book)
        return this.http.put<Book>(
            `${environment.apiUrl}/book/${book.id}`,
            book,
            {observe: 'response'} //capturar o corpo + metadados
        ).pipe(
            map(response => ({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status,
            })),
            catchError((error: HttpErrorResponse) => of({
                success: false,
                status: error.status,
                data: error.message
            }))
        )
    }      

    override search(query: string): Observable<OperationResult> {
        return this.http.get<Book>(
            `${environment.apiUrl}/book/search`,
            {
                observe: 'response',
                params: {query}
            } //capturar o corpo + metadados
        ).pipe(
            map(response => ({
                success: response.status >= 200 && response.status < 300 && response.body !== null && response.body !== undefined,
                data: response.body,
                status: response.status,
            })),
            catchError((error: HttpErrorResponse) => of({
                success: false,
                status: error.status,
                data: error.message
            }))
        )
    }

    override searchById(id: number): Observable<OperationResult> {
        return this.http.get<Book>(
            `${environment.apiUrl}/book/${id}`,
            {observe: 'response'} //capturar o corpo + metadados
        ).pipe(
            map(response => ({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status,
            })),
            catchError((error: HttpErrorResponse) => of({
                success: false,
                status: error.status,
                data: error.message
            }))
        )
    }
    }