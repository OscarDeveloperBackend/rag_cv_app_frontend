import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-front-navbar',
  imports: [RouterLink],
  templateUrl: './front-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontNavbar {
  authService = inject(AuthService);
}
