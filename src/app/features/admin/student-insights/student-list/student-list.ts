import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatCheckboxModule, RouterLink, MatSelectModule, MatFormFieldModule,],

  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList {

}
