import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertDialog } from '../../comman/alert-dialog/alert-dialog'; 
import { CommonService } from '../../../core/helper/common.service';

@Component({
  selector: 'app-profile',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule ],
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
  }
  
}
