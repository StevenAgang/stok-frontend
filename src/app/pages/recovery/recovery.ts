import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormTemplate } from '../../components/form/form-template';
import { ErrorTemplate } from '../../components/error/error-tempate';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recovery',
  imports: [CommonModule, ReactiveFormsModule, FormTemplate, ErrorTemplate, RouterLink],
  templateUrl: './recovery.html',
})
export class Recovery {
  error = signal<string>('');
  isLoading = signal<boolean>(false);
  private snackBar = inject(MatSnackBar);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private server: AuthenticationService,
    private router: Router,
  ) {}

  submitForm() {
    this.isLoading.set(true);
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      this.server.recover(email ?? '').subscribe({
        next: () => {
          this.snackBar.open('Successfully sent. Check your inbox', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
          });
        },
        error: () => {
          this.snackBar.open('Successfully sent. Check your inbox', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
          });
          this.isLoading.set(false);
        },
        complete: () => {
          this.router.navigate(['/login']);
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
}
