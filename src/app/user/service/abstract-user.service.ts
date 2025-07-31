import { Signal } from "@angular/core";
import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result.model";

export abstract class AbstractUserService {
    abstract users: Signal<User[]>;
    abstract refresh(): void;
    abstract add(user: Omit<User, 'id' | 'createdAt'>): Observable<OperationResult>;
    abstract remove(id: number): Observable<OperationResult>;
    abstract update(user: User): Observable<OperationResult>;
    abstract searchById(id: number): Observable<OperationResult>;
    abstract login(query: any): Observable<OperationResult>;
    
}
