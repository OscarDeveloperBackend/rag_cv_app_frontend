export interface GetPostulaciones {
  categoria: string;
  created_at: Date;
  descripcion: string;
  estado: string;
  id: number;
  requisitos: string;
  titulo: string;
}

export interface MiPostulacion {
  puesto_id: number;
  titulo: string;
  estado: string;
  match_percentage: number;
}
