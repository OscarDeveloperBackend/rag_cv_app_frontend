import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from "../../../postulaciones-front/components/front-navbar/front-navbar";

@Component({
  selector: 'app-admin-fron-layout',
  imports: [RouterOutlet, FrontNavbar],
  templateUrl: './admin-fron-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFronLayout {}
