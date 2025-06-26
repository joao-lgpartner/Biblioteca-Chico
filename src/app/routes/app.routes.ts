import { Routes } from '@angular/router';
import { BookList } from '../components/books/book-list/book-list.component';
import { BookForms } from '../components/books/book-form/book-form.components';
import { Home } from '../components/home/home.components'

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'books', component: BookList},
    {path: 'add-book', component: BookForms},
    {path: 'edit-book/:id', component: BookForms}
];
