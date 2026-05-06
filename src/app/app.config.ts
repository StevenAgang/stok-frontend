import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { API_URL } from './shared/api-url/api-url';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RequestInterceptor } from './service/interceptor/request-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([RequestInterceptor])),
    provideRouter(routes),
    { provide: API_URL, useValue: 'https://localhost:7012' },
  ],
};
