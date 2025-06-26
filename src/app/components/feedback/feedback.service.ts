import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from "./success-dialog.components";
import { ErrorDialogComponent } from "./error-dialog.components";

@Injectable({ providedIn: 'root' })
export class FeedbackService{
    constructor(private dialog: MatDialog){}

    success(message: string): void {
        this.dialog.open(SuccessDialogComponent,{ data:{ message }})
    }

    error(message: string): void {
        this.dialog.open(ErrorDialogComponent,{ data:{ message }})
    }
}