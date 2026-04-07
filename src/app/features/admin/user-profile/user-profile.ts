import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ChangePassword } from '../../../shared/components/change-password/change-password';

@Component({
  selector: 'app-user-profile',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule,RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {
    readonly dialog = inject(MatDialog); 

    changePassword(){
     this.dialog.open(ChangePassword, {
          width: '437px',
          panelClass: 'modal--wrapper',
          autoFocus: false, 
      });
    }
}
