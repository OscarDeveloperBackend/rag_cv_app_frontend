import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetPostulaciones } from '../../../postulaciones/interfaces/postulaciones-resp.interfaces';

@Component({
  selector: 'card-post',
  imports: [RouterLink],
  templateUrl: './card-post.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPost {
  post = input.required<GetPostulaciones>({});
}
