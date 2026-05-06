import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class StrongPassword {
  static strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const value = control.value;
    const error: any = {};

    if (!/[A-Z]/.test(value)) {
      error.missingUppercase = true;
    }
    if (!/[a-z]/.test(value)) {
      error.missingLowercase = true;
    }
    if (!/[0-9]/.test(value)) {
      error.missingDigit = true;
    }
    if (!/[!@#$%^&*]/.test(value)) {
      error.missingSpecialCharacter = true;
    }
    if (value.length < 8) {
      error.lessThanEight = true;
    }

    return error;
  }
}
