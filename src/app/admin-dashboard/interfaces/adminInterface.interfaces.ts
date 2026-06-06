export interface AdminPostulante {
  postulacion_id: number;
  nombres: string;
  apellidos: string;
  email: string;
  cv_url: string;
  estado: string;
  match_percentage: number;
  ai_summary: string;
  dni: string;
}
