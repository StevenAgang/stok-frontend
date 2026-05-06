import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './form-template.html',
})
export class FormTemplate {
  @Input('label') label?: string = '';
  @Input('inputId') inputId: string = '';
  @Input('inputType') inputType: string = '';
  @Input('enablePasswordValidation') passwordValidation: boolean = false;
  @Input('InputFormControlName') inputFormControlName: string = '';
  @Input('forgotPasswordLink') forgotPasswordLink?: string = '';
  @Input('hidden') hidden: boolean = false;
  @Input('inputState') inputState?: FormControl;
  @Input('placeHolder') placeHolder?: string = '';
  @Input('errorCss') errorCss?: string = 'error-global';
  @Input('labelCss') labelCss?: string = 'label-global';
  @Input('inputCss') inputCss?: string = 'input-global';
  @Input('formGroups') formGroups!: FormGroup;
  @Input('forCodeVerification') verification: boolean = false;
  @Output('resetMainError') reset = new EventEmitter<void>();

  errorKeys(errors: ValidationErrors | null): string[] {
    return errors ? Object.keys(errors) : [];
  }

  getErrorMessage(errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return this.capitalizeFirstLetter(this.inputId) + ' is required';
      case 'email':
        return 'Email is invalid';
      case 'pattern':
        return 'Please provide digits only';
    }
    return '';
  }

  NumericInput(event: KeyboardEvent) {
    if (this.verification) {
      if (this.formGroups.get('code')?.value?.length < 6) {
        const pattern = /^[0-9]$/;
        if (!pattern.test(event.key)) {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    }
  }

  resets() {
    this.reset.emit();
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  state() {
    return this.inputState;
  }
}
