import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertDialog } from '../../comman/alert-dialog/alert-dialog'; 
import { CommonService } from '../../../core/helper/common.service';
import { RouterLink } from '@angular/router';
import { ChangePassword } from '../../../shared/components/change-password/change-password';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule, MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  

  readonly dialog = inject(MatDialog); 

  constructor( private commonService: CommonService,) {}

  alert() { 
    this.dialog.open(AlertDialog, {
      width: '510px',
      panelClass: 'modal--wrapper',
      autoFocus: false,
      data: {
        title: 'Warning',
        message: 'Are you sure you would like to proceed with this?',
        button1: 'Yes',
        button2: 'May be',
        button3: 'No',
      }
    });
  } 

  isEditMode = false;

  enableEdit() {
    this.isEditMode = true;
    this.commonService.showLoader();
    setTimeout(() => {
      this.commonService.hideLoader();
    }, 1000);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.commonService.showLoader();
    setTimeout(() => {
      this.commonService.hideLoader();
    }, 1000);
  }

  
  
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
  
}
