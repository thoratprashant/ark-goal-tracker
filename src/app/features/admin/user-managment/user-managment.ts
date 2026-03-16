import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-managment',
  imports: [CommonModule,RouterLink,MatIconModule,MatSelectModule,MatFormFieldModule,],
  templateUrl: './user-managment.html',
  styleUrl: './user-managment.scss',
})
export class UserManagment {

}
