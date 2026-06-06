import { User } from './auth-login-response.interface';

export interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}
