import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ChangePassword } from '../../../shared/components/change-password/change-password';
import AOS from 'aos';

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

    logs = [
      {
        role: 'District Admin',
        method: 'Password Method',
        date: '03/02/2026, 02:05 AM'
      },
      {
        role: 'State Admin',
        method: 'OTP Method',
        date: '03/02/2026, 03:15 AM'
      },
      {
        role: 'User',
        method: 'Password Method',
        date: '03/02/2026, 04:10 AM'
      },
      {
        role: 'Super Admin',
        method: 'SSO Login',
        date: '03/02/2026, 05:45 AM'
      }
    ];

    ngAfterViewInit(): void {
      AOS.init({
        duration: 1000,
        once: true
      }); 
      AOS.refresh();
    }
}
