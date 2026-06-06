import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Postulantes } from './postulantes/postulantes';

@Component({
  selector: 'app-postulantes-admin-page',
  imports: [Postulantes],
  templateUrl: './postulantes-admin-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostulantesAdminPage {
  private route = inject(ActivatedRoute);
  private adminService = inject(AdminService);

  puestoId = Number(this.route.snapshot.params['id']);

  postulantesResource = resource({
    loader: () => firstValueFrom(this.adminService.getPostulantes(this.puestoId)),
  });
}
