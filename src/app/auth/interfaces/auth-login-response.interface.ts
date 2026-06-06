export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  apellidos: string;
  email: string;
  id: number;
  is_admin: boolean;
  nombres: string;
}
export interface IsAdmin {
  is_admin: boolean;
  valid: boolean;
}
export interface VerifyResponse {
  valid: boolean;
  token: string;
  user: User;
}
