import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-set-password',
  imports: [CommonModule,RouterLink,MatButtonModule, MatIconModule],
  templateUrl: './set-password.html',
  styleUrl: './set-password.scss',
})
export class SetPassword {

  showNewPassword = false; 

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  } 

}
