import { Component, signal } from '@angular/core';
import { FormTemplate } from '../form/form-template';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  searchCss = signal<string>('w-0');
  searchClicked: boolean = false;

  form = new FormGroup({
    search: new FormControl(),
  });

  searchState() {
    return this.form.get('search') as FormControl;
  }

  openSearch() {
    if (this.searchClicked == false) {
      this.searchClicked = true;
      return this.searchCss.set(
        'rounded-xl px-2 bg-white w-full transition-all duration-300 ease ',
      );
    }

    this.searchClicked = false;
    this.searchCss.set('w-0 transition-all duration-300 ease');
  }
}
