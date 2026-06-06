import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { FilterCategory } from '../../components/filter-category/filter-category';
import { CardPost } from '../../components/card-post/card-post';
import { PostulacionesService } from '../../../postulaciones/services/postulaciones.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-posts-page',
  imports: [FilterCategory, CardPost],
  templateUrl: './posts-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPage {
  private postulacionesService = inject(PostulacionesService);

  categori = signal<string>('');

  postulacionesResource = resource({
    params: () => ({}),
    loader: () => {
      return firstValueFrom(this.postulacionesService.getPostulacion());
    },
  });

  postsFiltrados = computed(() => {
    const categoriaSeleccionada = this.categori();

    const posts = this.postulacionesResource.value() ?? [];

    if (!categoriaSeleccionada) {
      return posts;
    }

    return posts.filter((post) => post.categoria === categoriaSeleccionada);
  });
}
