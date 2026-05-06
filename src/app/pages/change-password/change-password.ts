import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormTemplate } from '../../components/form/form-template';
import { ErrorTemplate } from '../../components/error/error-tempate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StrongPassword } from '../../Validation/password-validation';
import { UserAccountService } from '../../service/useraccount/user-account-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormTemplate, ErrorTemplate],
  templateUrl: './change-password.html',
})
export class ChangePassword implements OnInit {
  error = signal<string>('');
  isLoading = signal<boolean>(false);
  form = new FormGroup({
    password: new FormControl('', [Validators.required, StrongPassword.strongPasswordValidator]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  identity: string = '';
  snackbar = inject(MatSnackBar);

  constructor(
    private server: UserAccountService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.identity = this.route.snapshot.queryParamMap.get('identity') ?? '';

    console.log(this.identity);
  }

  submitForm() {
    const password = this.form.get('password')?.value ?? '';
    const confirmPassword = this.form.get('confirmPassword')?.value ?? '';
    if (!password || !confirmPassword || password != confirmPassword) {
      this.error.set('Password not match');
      return;
    }

    this.isLoading.set(true);
    if (this.form.valid) {
      this.server.changePassword(this.identity, password).subscribe({
        next: () => {
          this.snackbar.open('Change password successfully', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
          });
          this.router.navigate(['/login']);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.log(error);
          this.error.set(error.originalError.error.message);
        },
      });
    }
  }

  formState() {
    return this.form.valid;
  }

  passwordState() {
    return this.form.get('password') as FormControl;
  }
  confirmPasswordState() {
    return this.form.get('confirmPassword') as FormControl;
  }
  resetError() {
    if (!this.error()) {
      return;
    }
    this.error.set('');
  }
}
