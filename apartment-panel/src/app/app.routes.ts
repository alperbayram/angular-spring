import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payments/payments.component').then((m) => m.PaymentsComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'announcements',
    loadComponent: () =>
      import('./announcements/announcements.component').then(
        (m) => m.AnnouncementsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
