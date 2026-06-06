import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const AdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    console.log('Si es Admin');
    return true;
  }
  console.log('No es Admin');

  router.navigate(['/']);
  return false;
};
