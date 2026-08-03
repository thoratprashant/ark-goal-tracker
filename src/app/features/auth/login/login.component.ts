import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';  
import { CommonService } from '../../../core/helper/common.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
 
  loginForm!: FormGroup;
  showNewPassword = false;

  constructor(private fb: FormBuilder,private commonService: CommonService,private router: Router,) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } 
  }

  get f() {
    return this.loginForm.controls;
  }

  login(){
    this.commonService.showLoader();
      setTimeout(() => {
      this.commonService.hideLoader();
      this.router.navigate(['/admin/dashboard']);
    }, 2000);
  }
}
