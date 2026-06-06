import { Routes } from '@angular/router';
import { PostulacionesFrontLayout } from './layouts/postulaciones-front-layout/postulaciones-front-layout';
import { HomePage } from './pages/home-page/home-page';
import { PostsPage } from './pages/posts-page/posts-page';
import { PostPage } from './pages/post-page/post-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { PostulacionesPage } from './pages/postulaciones-page/postulaciones-page';

export const postulacionesRoutes: Routes = [
  {
    path: '',
    component: PostulacionesFrontLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'posts',
        component: PostsPage,
      },
      {
        path: 'post/:id',
        component: PostPage,
      },
      {
        path: 'postulaciones',
        component: PostulacionesPage,
      },
      {
        path: '**',
        component: NotFoundPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
export default postulacionesRoutes;
