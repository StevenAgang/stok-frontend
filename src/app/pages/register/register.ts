import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormTemplate } from '../../components/form/form-template';
import { ErrorTemplate } from '../../components/error/error-tempate';
import { validate } from '@angular/forms/signals';
import { StrongPassword } from '../../Validation/password-validation';
import { Router, RouterLink } from '@angular/router';
import { UserAccountService } from '../../service/useraccount/user-account-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormTemplate, ErrorTemplate, RouterLink],
  templateUrl: './register.html',
})
export class Register implements OnInit {
  error = signal<string>('');
  isLoading = signal<boolean>(false);
  userAgent: string = '';
  platform: string = '';
  private snackBar = inject(MatSnackBar);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, StrongPassword.strongPasswordValidator]),
  });

  constructor(
    private server: UserAccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userAgent = navigator.userAgent;
    this.platform = navigator.platform;
  }

  submitForm() {
    this.isLoading.set(true);
    if (this.form.valid) {
      this.server.register(this.form.value).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.isLoading.set(false);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.error.set(error.originalError.message);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }

  formState() {
    return this.form.valid;
  }

  firstNameState() {
    return this.form.get('firstName') as FormControl;
  }

  lastNameState() {
    return this.form.get('lastName') as FormControl;
  }

  emailState() {
    return this.form.get('email') as FormControl;
  }

  passwordState() {
    return this.form.get('password') as FormControl;
  }

  resetError() {
    if (!this.error()) {
      return;
    }
    this.error.set('');
  }
}
