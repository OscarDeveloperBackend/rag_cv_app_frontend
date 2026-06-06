import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { PostulacionesService } from '../../../postulaciones/services/postulaciones.service';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-postulaciones-page',
  imports: [RouterLink],
  templateUrl: './postulaciones-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostulacionesPage {
  authService = inject(AuthService);
  postlacionesService = inject(PostulacionesService);

  misPostulacionesResource = resource({
    loader: () => firstValueFrom(this.postlacionesService.myPostulaciones()),
  });
}
