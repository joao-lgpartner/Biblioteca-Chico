import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Signal } from '@angular/core';

export abstract class AbstractUserService {
  abstract users: Signal<User[]>;
  // abstract getUser(id: number): Observable<User>;
  // abstract addUser(user: User): Observable<User>;
  // abstract updateUser(user: User): Observable<User>;
  // abstract deleteUser(id: number): Observable<void>;
}
