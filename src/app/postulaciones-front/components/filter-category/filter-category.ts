import { ChangeDetectionStrategy, Component, inject, input, output, resource } from '@angular/core';
import { Categorias } from '../../../postulaciones/interfaces/categorias.interfaces';
import { firstValueFrom } from 'rxjs';
import { PostulacionesService } from '../../../postulaciones/services/postulaciones.service';

@Component({
  selector: 'filter-category',
  imports: [],
  templateUrl: './filter-category.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCategory {
  private postulacionesService = inject(PostulacionesService);
  categoriasResource = resource({
    params: () => ({}),
    loader: ({}) => {
      return firstValueFrom(this.postulacionesService.getCategorias());
    },
  });

  categoriaChange = output<string>();
}
