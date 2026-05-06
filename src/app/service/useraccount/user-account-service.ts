import { inject, Inject, Injectable } from '@angular/core';
import { API_URL } from '../../shared/api-url/api-url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GlobalErrorHandler } from '../../error/global-error-handler';
import { ApiResponse } from '../../interface/ApiResponse/api-response';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(
    @Inject(API_URL) private url: string,
    private client: HttpClient,
  ) {}

  public register(payload: {}) {
    return this.client.post(this.url + '/user/register', payload).pipe(
      map((response) => {
        return response as ApiResponse<{ id: number; urlToken: string }>;
      }),
      catchError((error) => {
        return throwError(() => new GlobalErrorHandler(error.error));
      }),
    );
  }

  public changePassword(token: string, password: string) {
    const params = new HttpParams().set('token', token);
    return this.client
      .patch(this.url + '/user/recover/change-password', { password }, { params })
      .pipe(
        catchError((error) => {
          return throwError(() => new GlobalErrorHandler(error));
        }),
      );
  }
}
