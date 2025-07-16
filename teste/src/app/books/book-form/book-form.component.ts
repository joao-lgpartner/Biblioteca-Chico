import { Component, inject } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { ActivatedRoute, Router }         from '@angular/router';
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
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id')
    console.log(idParam)
    const id = Number(idParam)

    if(idParam){
      this.service.searchById(id).subscribe(result => {
        if (result.success && result.data) {
          this.form.patchValue(result.data);
        }else {
          this.feedback.error("Livro não encontrado")
          this.router.navigate(['/']);
        }
      })
    }
  }

  addBook(){
    const book: Omit<Book, 'id'> = this.form.getRawValue();
    return book
  }

  async onSubmit(): Promise<void>{
    const formValue = this.form.getRawValue()
    const result = formValue.id == null ? 
    await firstValueFrom(this.service.add(this.addBook())) :
    await firstValueFrom(this.service.update(formValue as Book));

    if(result.success){
      this.feedback.success(formValue.id ? 'Livro atualizado com sucesso' : 'Livro adicionado com sucesso');
      this.form.reset();
      this.router.navigate(['/']);
    }else{
      this.feedback.error(`Erro ${result.data}`)
    }
  }

  onCancel(): void{
    this.feedback.success('Ação Cancelada')
    this.router.navigate(['/'])
  } 

}
