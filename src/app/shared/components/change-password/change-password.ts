import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from "@angular/cdk/table";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CdkTableModule,ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {
showCurrentPassword = false;
showNewPassword = false;
showConfirmPassword = false;

  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

togglePassword(type: string) {
  if (type === 'current') {
    this.showCurrentPassword = !this.showCurrentPassword;
  } else if (type === 'new') {
    this.showNewPassword = !this.showNewPassword;
  } else if (type === 'confirm') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

  get f() {
    return this.changePasswordForm.controls;
  }

  passwordMatchValidator(form: AbstractControl) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
 
  }
}
