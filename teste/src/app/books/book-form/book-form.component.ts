import { Component, inject } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { Router }         from '@angular/router';
import { CommonModule }   from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AbstractBookService } from '../service/abstract-book.service';
import { FeedbackService } from '../../components/feedback/feedback.service';
import { Book } from '../model/book.model';
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: 
  [CommonModule, FormsModule, ReactiveFormsModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookForm {
  form = new FormGroup({
    id    : new FormControl<number | null>(null),
    title : new FormControl('',{nonNullable: true}),
    author : new FormControl('',{nonNullable: true}),
    year : new FormControl(2020,{nonNullable: true})
  })

  private service = inject(AbstractBookService)
  private feedback = inject(FeedbackService)
  private router = inject(Router)

  async onSubmit(): Promise<void>{
    const book: Omit<Book, 'id'> = this.form.getRawValue()
    const result = await firstValueFrom(this.service.add(book))

    if(result.success){
      this.feedback.success("Livro adicionado com sucesso")
      this.router.navigate(['/'])
    }else{
      this.feedback.error(`Error ${result.data}`)
    }
  }
  onCancel(){
    
  }  

}
