import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error-template.html',
})
export class ErrorTemplate {
  @Input('errorMessage') errorMessage = signal<string>('');
}
