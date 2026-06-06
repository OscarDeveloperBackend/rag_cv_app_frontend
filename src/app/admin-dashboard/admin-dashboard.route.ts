import { Routes } from '@angular/router';
import { AdminFronLayout } from './layout/admin-fron-layout/admin-fron-layout';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { CreatePostPage } from './pages/create-post-page/create-post-page';
import { PostulantesAdminPage } from './pages/postulantes-admin-page/postulantes-admin-page';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminFronLayout,
    children: [
      { path: 'home', component: DashboardPage },
      { path: 'create_post', component: CreatePostPage },
      { path: 'postulantes/:id', component: PostulantesAdminPage },
      { path: '**', redirectTo: 'home' },
    ],
  },
];
export default AdminRoutes;
