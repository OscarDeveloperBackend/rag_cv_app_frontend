import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './auth-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLogin {
  fb = inject(FormBuilder);
  hasError = signal(false);
  authService = inject(AuthService);
  router = inject(Router);

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmint() {
    if (this.myForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '' } = this.myForm.value;
    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
          console.log(returnUrl);
          localStorage.removeItem('returnUrl');
          return;
        }

        const user = this.authService.user();
        if (user?.is_admin === true) {
          this.router.navigateByUrl('/admin/home');
        } else {
          this.router.navigateByUrl('/posts');
        }
        return;
      }
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }
}
