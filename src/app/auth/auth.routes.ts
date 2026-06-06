import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { AuthLogin } from './pages/auth-login/auth-login';
import { AuthRegister } from './pages/auth-register/auth-register';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: AuthLogin },
      { path: 'register', component: AuthRegister },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
export default authRoutes;
