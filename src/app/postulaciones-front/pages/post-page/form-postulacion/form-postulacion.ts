import { ChangeDetectionStrategy, Component, inject, input, resource, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostulacionesService } from '../../../../postulaciones/services/postulaciones.service';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'form-postulacion',
  imports: [ReactiveFormsModule],
  templateUrl: './form-postulacion.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPostulacion {
  router = inject(Router);
  isAuthenticated = input<boolean>(false);
  authService = inject(AuthService);
  returnUrl = input<string>('');
  hasError = signal(false);
  postulacionService = inject(PostulacionesService);
  fb = inject(FormBuilder);
  puestoId = input.required<string>();
  yaPostulo = signal(false);
  selectedFile: File | null = null;

  myForm = this.fb.group({
    cv_url: ['', Validators.required],
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];
  }

  onSubmint() {
    if (this.myForm.invalid || !this.selectedFile) {
      console.log('fallo los archivos y el form');
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { cv_url } = this.myForm.getRawValue();

    this.postulacionService
      .handlerPostulacion(this.puestoId(), cv_url!, this.selectedFile)
      .subscribe((ok) => {
        if (ok) {
          this.yaPostulo.set(true);
          return;
        }

        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      });
  }

  login() {
    localStorage.setItem('returnUrl', this.returnUrl());
    this.router.navigateByUrl('/auth/login');
  }
}
