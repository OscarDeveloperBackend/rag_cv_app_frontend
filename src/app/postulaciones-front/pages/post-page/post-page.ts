import { ChangeDetectionStrategy, Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulacionesService } from '../../../postulaciones/services/postulaciones.service';
import { firstValueFrom } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { FormPostulacion } from './form-postulacion/form-postulacion';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-post-page',
  imports: [TitleCasePipe, FormPostulacion],
  templateUrl: './post-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPage {
  private postulacionesService = inject(PostulacionesService);
  authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.params['id'];

  misPostulacionesResource = resource({
    loader: () => firstValueFrom(this.postulacionesService.myPostulaciones()),
  });
  yaPostulado = computed(() => {
    const postulaciones = this.misPostulacionesResource.value() ?? [];

    return postulaciones.some((p) => p.puesto_id === Number(this.id));
  });

  postulacionResource = resource({
    params: () => ({}),
    loader: ({}) => {
      return firstValueFrom(this.postulacionesService.getPostulacionById(this.id));
    },
  });

  requisitos = computed(
    () =>
      this.postulacionResource
        .value()
        ?.requisitos?.split(',')
        .map((r) => r.trim()) ?? [],
  );

  urlReturn = `/post/${this.id}`;
}
