import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

export interface AdminPuesto {
  id: number;
  titulo: string;
  categoria: string;
  estado: string;
  total_postulantes: number;
  created_at: string;
}

export interface AdminPostulante {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  cv_url: string;
  estado: string;
  match_percentage: number;
  ai_summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  // GET /admin/puestos
  getPuestos(): Observable<AdminPuesto[]> {
    return this.http.get<AdminPuesto[]>(`${baseUrl}/admin/puestos`);
  }

  // POST /admin/puestos
  createPuesto(data: {
    titulo: string;
    descripcion: string;
    requisitos: string;
    categoria_id: number;
  }) {
    return this.http.post(`${baseUrl}/admin/puestos`, data);
  }

  // PATCH /admin/puestos/:id/cerrar
  cerrarPuesto(id: number) {
    return this.http.patch(`${baseUrl}/admin/puestos/${id}/cerrar`, {});
  }

  // GET /admin/puestos/:puesto_id/postulantes
  getPostulantes(puestoId: number): Observable<AdminPostulante[]> {
    return this.http.get<AdminPostulante[]>(`${baseUrl}/admin/puestos/${puestoId}/postulantes`);
  }

  // PATCH /admin/postulaciones/:id/estado
  cambiarEstadoPostulacion(postulacionId: number, estado: string) {
    return this.http.patch(`${baseUrl}/admin/postulaciones/${postulacionId}/estado`, { estado });
  }
}
