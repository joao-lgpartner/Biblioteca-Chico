import { Component, inject } from '@angular/core';
import { FeedbackService } from '../../feedback/feedback.service';
import { AbstractUserService } from '../service/abstract-user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatButtonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private feedback = inject(FeedbackService);
  private service = inject(AbstractUserService);

  email = '';
  password = '';

  onLogin(): void {
    if (!this.email || !this.password) {
      this.feedback.error('Preencha todos os campos.');
      return;
    }

    // Busca o usuário na lista de usuários do service sem usar .find
    let user = null;
    for (const u of this.service.users()) {
      if (u.email === this.email && u.password === this.password) {
        user = u;
        break;
      }
    }

    if (user) {
      this.feedback.success('Login realizado com sucesso!');
      // Aqui você pode redirecionar ou executar outra ação após o login
    } else {
      this.feedback.error('E-mail ou senha inválidos.');
    }
  }
}
