import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('Auth Guard çalıştı, login durumu:', authService.isLoggedIn());

  if (authService.isLoggedIn()) {
    return true;
  }

  // Not logged in, redirect to login page
  router.navigate(['/login']);
  return false;
};
