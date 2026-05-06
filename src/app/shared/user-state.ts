import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private id: number = 0;
  private name: string = '';

  getId() {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }
  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
}
