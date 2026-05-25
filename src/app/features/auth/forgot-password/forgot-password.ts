import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordComponent {
  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: true
    }); 
    AOS.refresh();
  }
}
