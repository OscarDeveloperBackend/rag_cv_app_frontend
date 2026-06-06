import { ChangeDetectionStrategy, Component } from '@angular/core';
import { input } from '@angular/core';
import { RouterLink } from "@angular/router";

export interface AdminPost {
  id: number;
  titulo: string;
  categoria: string;
  estado: string;
  total_postulantes: number;
  created_at: string;
}
@Component({
  selector: 'post-admin',
  imports: [RouterLink],
  templateUrl: './post-admin.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostAdmin {
  post = input.required<AdminPost>();
}
