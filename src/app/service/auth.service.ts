import { Inject, Injectable, Injector, signal } from "@angular/core";
import { User } from "../user/model/user.model";

@Injectable({providedIn: "root"})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private sessionToken = signal<string | null>(null);
  private expirationTime?: ReturnType<typeof setTimeout>;

  constructor(@Inject(Injector) private injector: Injector) {
    if(typeof window !== 'undefined') {
     const token = localStorage.getItem('token');
     const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (token && user) {
        this.sessionToken.set(token);
        this.currentUser.set(user);
        }
    }
  }

}