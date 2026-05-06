import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication-service';

export const RequestInterceptor: HttpInterceptorFn = (req, next) => {
  const AuthService = inject(AuthenticationService);
  const cloned = req.clone({
    withCredentials: true,
  });
  if (
    req.url.includes('/user/refresh') ||
    req.url.includes('/user/logout') ||
    req.url.includes('/user/login')
  ) {
    return next(cloned);
  }
  return next(cloned).pipe(
    catchError((err) => {
      if (err.status == 401) {
        return AuthService.refreshToken().pipe(
          switchMap(() => {
            return next(cloned.clone());
          }),
          catchError(() => {
            const userId = AuthService.userId;
            AuthService.logout(userId);
            return throwError(() => err);
          }),
        );
      }
      return throwError(() => err);
    }),
  );
};
