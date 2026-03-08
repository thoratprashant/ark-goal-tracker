import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verification-code',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verification-code.html',
  styleUrl: './verification-code.scss',
})
export class VerificationCode {

}
