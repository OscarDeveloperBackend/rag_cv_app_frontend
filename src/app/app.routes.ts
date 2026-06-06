import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guard/not-authenticated.guard';
import { AdminGuard } from './admin-dashboard/guard/admin-guard.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.route'),
    canMatch: [AdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [NotAuthenticatedGuard],
  },

  {
    path: '',
    loadChildren: () => import('./postulaciones-front/postulaciones-front.routes'),
  },
];
