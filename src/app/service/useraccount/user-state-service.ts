import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../../shared/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSubject = new BehaviorSubject<{ id: string; name: string } | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: { id: string; name: string } | null) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }
}
