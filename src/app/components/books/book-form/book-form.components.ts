import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-forms',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './book-form.components.html',
  styleUrl: './book-form.components.scss'
})
export class BookForms {
  form = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl('', {nonNullable: true}),
    author: new FormControl('', {nonNullable: true}),
    year: new FormControl('202', {nonNullable: true}),
  })
}
