import { Injectable, signal, Signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { AbstractUserService } from './abstract-user.service';

@Injectable()
export class MockUserService extends AbstractUserService {
  private _users = signal<User[]>([
    {id: 1, name: 'JoaoG', email: 'joao@gmail.com', password: '123 }'},
    {id: 2, name: 'MariaS', email: 'maria@gmail', password: '1234'}
  ])
  // object book
  users: Signal<User[]> = computed(()=> this._users())

}
