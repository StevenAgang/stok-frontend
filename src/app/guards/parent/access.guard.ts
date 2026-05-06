import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication-service';
import { catchError, map, of } from 'rxjs';
import { UserStateService } from '../../service/useraccount/user-state-service';

export const AccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const server = inject(AuthenticationService);
  const userState = inject(UserStateService);

  return server.viewAccess().pipe(
    map((response) => {
      userState.setUser(response.content ?? null);
      return true;
    }),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
