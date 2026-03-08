import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface VerificationCodeDialogData {
  title?: string;
  message: string;
  button1?: string; 
}

@Component({
  selector: 'app-verification-code-dialog',
  imports: [MatDialogModule, MatButtonModule,MatIconModule],
  templateUrl: './verification-code-dialog.html',
  styleUrl: './verification-code-dialog.scss',
})
export class VerificationCodeDialog {
  constructor(
    public dialogRef: MatDialogRef<VerificationCodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: VerificationCodeDialogData
  ) {}

  close(): void {
    this.dialogRef.close(true);
  }
}
