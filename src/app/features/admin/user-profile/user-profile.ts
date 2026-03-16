import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  imports: [MatIconModule,CommonModule,MatButtonModule,MatDialogModule,MatCheckboxModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

}
