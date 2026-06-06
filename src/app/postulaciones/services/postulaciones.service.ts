import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GetPostulaciones, MiPostulacion } from '../interfaces/postulaciones-resp.interfaces';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { Categorias } from '../interfaces/categorias.interfaces';
import { AuthService } from '../../auth/services/auth.service';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class PostulacionesService {
  private http = inject(HttpClient);
  authService = inject(AuthService);

  getPostulacion(): Observable<GetPostulaciones[]> {
    return this.http.get<GetPostulaciones[]>(`${baseUrl}/puestos`);
  }
  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(`${baseUrl}/categorias`);
  }

  getPostulacionById(id: string): Observable<GetPostulaciones> {
    return this.http.get<GetPostulaciones>(`${baseUrl}/puestos/${id}`);
  }

  // api_bp.route('/cv/evaluate', methods=['POST'])(evaluate_cv_controller)
  handlerPostulacion(puesto_id: string, cv_url: string, file: File): Observable<boolean> {
    const formData = new FormData();

    formData.append('puesto_id', puesto_id);
    formData.append('cv_url', cv_url);
    formData.append('file', file);

    return this.http.post(`${baseUrl}/cv/evaluate`, formData).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  myPostulaciones(): Observable<MiPostulacion[]> {
    return this.http.get<MiPostulacion[]>(`${baseUrl}/mis-postulaciones`);
  }
}
