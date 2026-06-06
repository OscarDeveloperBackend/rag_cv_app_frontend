import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AdminPostulante } from '../../../service/admin.service';

@Component({
  selector: 'app-postulantes',
  imports: [],
  templateUrl: './postulantes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Postulantes {
  postulante = input.required<AdminPostulante>();
}
