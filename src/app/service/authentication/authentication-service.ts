import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../shared/api-url/api-url';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { GlobalErrorHandler } from '../../error/global-error-handler';
import { ApiResponse } from '../../interface/ApiResponse/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    @Inject(API_URL) private url: string,
    private client: HttpClient,
  ) {}

  userId: number = 1;

  public login(payload: { email: string; password: string }) {
    return this.client.post(this.url + '/user/login', payload, { withCredentials: true }).pipe(
      map((response) => {
        return response as ApiResponse<{ id: number; name: string }>;
      }),
      catchError((error) => {
        return throwError(() => new GlobalErrorHandler(error));
      }),
    );
  }

  public refreshToken() {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;

    return this.client
      .patch(
        this.url + '/user/refresh',
        { UserAccountId: 1, refreshToken: '', platform: platform, userAgent: userAgent },
        { withCredentials: true },
      )
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  public recover(email: string) {
    return this.client.get(this.url + '/user/recover', { params: { email: email } }).pipe(
      catchError((error) => {
        return throwError(() => new GlobalErrorHandler(error));
      }),
    );
  }

  public logout(userId: number) {}

  public viewAccess() {
    return this.client.get(this.url + '/authorize', { withCredentials: true }).pipe(
      map((response) => {
        return response as ApiResponse<{ id: string; name: string }>;
      }),
      catchError((error) => {
        return throwError(() => new GlobalErrorHandler(error));
      }),
    );
  }
}
