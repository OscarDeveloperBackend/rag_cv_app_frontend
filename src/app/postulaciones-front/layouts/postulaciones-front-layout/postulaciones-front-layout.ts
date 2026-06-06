import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from "../../components/front-navbar/front-navbar";

@Component({
  selector: 'app-postulaciones-front-layout',
  imports: [RouterOutlet, FrontNavbar],
  templateUrl: './postulaciones-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostulacionesFrontLayout {}
