import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Recovery } from './pages/recovery/recovery';
import { ChangePassword } from './pages/change-password/change-password';
import { AccessGuard } from './guards/parent/access.guard';
import { Client } from './components/client/client';
import { Audit } from './audit/audit';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    children: [
      { path: '', component: Client },
      { path: 'audit', component: Audit },
    ],
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'recovery', component: Recovery },
  { path: 'recovery/change-password', component: ChangePassword },
  { path: '**', component: Login },
];
