import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [CommonModule],
  templateUrl: './client.html',
})
export class Client {
  paddingBottom = signal<string>('15');
  expand = signal<boolean>(false);

  expandDetails() {
    if (this.expand() == false) {
      this.expand.set(true);
      console.log(this.expand());
      return;
    }
    this.expand.set(false);
    console.log(this.expand());
    return;
  }
}
