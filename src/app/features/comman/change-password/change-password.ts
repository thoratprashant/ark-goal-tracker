import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-change-password',
  imports: [MatButtonModule, MatDialogModule,MatIconModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
  readonly dialog = inject(MatDialog);

  showNewPassword = false;
  showConfirmPassword = false;
  showoldPassword = false;

  toggleOldPassword(): void {
    this.showoldPassword = !this.showoldPassword;
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submitChangePassword(){
    this.dialog.open(AlertDialog, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
      data: {
        title: 'Change Password',
        message: 'Where should we sent the Verification Code?',
        button1: 'Via Email',
        button2: 'Via Mobile',
        button3: '',
      }
    });
  }
}
