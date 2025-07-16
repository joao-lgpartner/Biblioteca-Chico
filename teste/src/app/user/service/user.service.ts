import { Injectable, signal, Signal, computed } from "@angular/core";
import { AbstractUserService } from "./abstract-user.service";
import { User } from "../model/user.model";
import { Observable, of } from "rxjs";
import { OperationResult } from "../../models/operation-result.model";

@Injectable()
export class UserService extends AbstractUserService {
    private _users = signal<User[]>([])
    override users: Signal<User[]> = computed(()=>this._users())

    override refresh(): void {
        
    }
    override add(user: Omit<User, "id" | "createdAt">): Observable<OperationResult>{
        return of()
    }
    override remove(id: number): Observable<OperationResult>{
        return of()
    }
    override update(user: User): Observable<OperationResult>{
        return of()
    }
    override searchById(id: number): Observable<OperationResult>{
        return of()
    }
    override login(query: any): Observable<OperationResult>{
        return of()
    }
}