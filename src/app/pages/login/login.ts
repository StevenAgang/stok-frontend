import { Component, inject, OnInit, signal } from '@angular/core';
import { FormTemplate } from '../../components/form/form-template';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorTemplate } from '../../components/error/error-tempate';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormTemplate, ErrorTemplate, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  userAgent: string = '';
  platform: string = '';
  private snackBar = inject(MatSnackBar);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userAgent = navigator.userAgent;
    this.platform = navigator.platform;
  }

  submitForm() {
    this.isLoading.set(true);
    if (this.form.valid) {
      const payload = this.form.value as {
        email: string;
        password: string;
        userAgent: string;
        platform: string;
      };

      payload.userAgent = this.userAgent;
      payload.platform = this.platform;

      this.auth.login(payload).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'OK', {
            duration: 5000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
          });
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.error.set(error.originalError.error.message);
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
