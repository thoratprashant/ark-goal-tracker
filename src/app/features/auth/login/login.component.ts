import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router'; 
import { emailOrMobileValidator } from '../../../shared/validators/email-or-mobile.validator';
import { regex } from '../../../utils/regex-patterns';
import { Messages, validationMessages } from '../../../utils/validation-messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  validationMessages = validationMessages; // Expose validation messages to template 
  showNewPassword = false; 
 

  /* Form Builder Injection */
  private fb = inject(FormBuilder);

  /** Login form (email / mobile) */
  loginForm = this.fb.group({
    username: ['', emailOrMobileValidator()]
  });



  constructor( 
  ) { }
 
 
  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }
 
}
