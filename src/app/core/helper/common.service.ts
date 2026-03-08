import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderComponent } from '../../features/comman/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  private loaderDialogRef?: MatDialogRef<LoaderComponent>;

  constructor(private dialog: MatDialog,private snack: MatSnackBar) {}

  showLoader(): void {
    if (!this.loaderDialogRef) {
      this.loaderDialogRef = this.dialog.open(LoaderComponent, {
        disableClose: true,
        panelClass: 'loader-dialog',
      });
    }
  }

  showConsole(msg: any){
    console.log(msg)
  }

  hideLoader(): void {
    this.loaderDialogRef?.close();
    this.loaderDialogRef = undefined;
  }

  success(message: string) {
    this.snack.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snack-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  error(message: string) {
    this.snack.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snack-error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  info(message: string) {
    this.snack.open(message, 'OK', {
      duration: 4000,
      panelClass: ['snack-info'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
