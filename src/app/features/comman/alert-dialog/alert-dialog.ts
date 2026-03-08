import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface AlertDialogData {
  title?: string;
  message: string;
  button1?: string;
  button2?: string;
  button3?: string;
}

@Component({
  selector: 'app-alert-dialog',
  imports: [MatDialogModule, MatButtonModule,MatIconModule],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.scss',
})
export class AlertDialog {
  constructor(
    public dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  close(): void {
    this.dialogRef.close(true);
  }
  
}
