import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PostAdmin } from '../../components/post-admin/post-admin';
import { AdminService } from '../../service/admin.service';
import { FilterCategory } from '../../../postulaciones-front/components/filter-category/filter-category';

@Component({
  selector: 'app-dashboard-page',
  imports: [PostAdmin, FilterCategory],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private adminService = inject(AdminService);

  categori = signal<string>('');

  puestosResource = resource({
    loader: () => firstValueFrom(this.adminService.getPuestos()),
  });

  postsFiltrados = computed(() => {
    const categoriaSeleccionada = this.categori();
    const puestos = this.puestosResource.value() ?? [];

    if (!categoriaSeleccionada) {
      return puestos;
    }

    return puestos.filter((puesto) => puesto.categoria === categoriaSeleccionada);
  });
}
