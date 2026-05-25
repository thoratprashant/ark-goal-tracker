import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import AOS from 'aos';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule,RouterLink,MatButtonModule, MatIconModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  showNewPassword = false;
  showConfirmPassword = false;

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

    ngAfterViewInit(): void {
      AOS.init({
        duration: 1000,
        once: true
      }); 
      AOS.refresh();
    }
}
