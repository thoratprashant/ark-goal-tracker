import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VerificationCodeDialog } from '../verification-code-dialog/verification-code-dialog';

@Component({
  selector: 'app-change-email',
  imports: [MatDialogModule, MatButtonModule,MatIconModule],
  templateUrl: './change-email.html',
  styleUrl: './change-email.scss',
})
export class ChangeEmail {
  readonly dialog = inject(MatDialog);

  verificationCode(){
    this.dialog.open(VerificationCodeDialog, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false, 
    });
  }
 
}
