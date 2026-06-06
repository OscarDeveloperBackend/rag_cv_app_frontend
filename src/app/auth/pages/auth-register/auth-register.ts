import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './auth-register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthRegister {
  fb = inject(FormBuilder);
  hasError = signal(false);
  router = inject(Router);
  authService = inject(AuthService);

  registerForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    dni: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(18)]],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmint() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000); 
      return;
    }

    const {
      nombres = '',
      apellidos = '',
      dni = '',
      edad = 0,
      telefono = '',
      email = '',
      password = '',
    } = this.registerForm.value;
    this.authService
      .register(nombres!, apellidos!, dni!, edad!, telefono!, email!, password!)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/posts');
          return;
        }
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      });
  }
}
