import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IsAdmin,
  LoginResponse,
  User,
  VerifyResponse,
} from '../interfaces/auth-login-response.interface';
import { RegisterResponse } from '../interfaces/auth-register.interfaces';
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private http = inject(HttpClient);
  private getUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return {
        id: payload.sub,
        nombres: payload.nombres,
        apellidos: payload.apellidos,
        email: payload.email,
        is_admin: payload.is_admin,
      };
    } catch {
      return null;
    }
  }

  checkStatusResource = resource({
    loader: () => firstValueFrom(this.checkStatus()),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }

    if (this._token()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  login(email: string, password: string) {
    // : Observable<boolean>
    return this.http
      .post<LoginResponse>(`${baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((resp) => this.handleAuthSucces(resp)),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error)),
      );
  }

  private handleAuthError(error: any) {
    console.log('entroalserror');

    this.logout();
    return of(false);
  }
  logout() {
    this._authStatus.set('not-authenticated');
    this._token.set(null);
    this._user.set(null);

    window.location.href = '/';

    localStorage.removeItem('token');
  }
  private handleAuthSucces(resp: LoginResponse) {
    this._token.set(resp.token);

    const user = this.getUserFromToken(resp.token);

    this._user.set(user);

    this._authStatus.set('authenticated');

    localStorage.setItem('token', resp.token);

    return true;
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      return of(false);
    }

    return this.http.get<VerifyResponse>(`${baseUrl}/auth/verify`).pipe(
      tap((resp) => {
        if (resp.valid) {
          const token = localStorage.getItem('token');

          if (token) {
            this._user.set(this.getUserFromToken(token));
          }

          this._authStatus.set('authenticated');
        }
      }),
      map((resp) => resp.valid),
      catchError((error) => this.handleAuthError(error)),
    );
  }

  register(
    nombres: string,
    apellidos: string,
    dni: string,
    edad: number,
    telefono: string,
    email: string,
    password: string,
  ): Observable<boolean> {
    return this.http
      .post<RegisterResponse>(`${baseUrl}/auth/register`, {
        nombres,
        apellidos,
        dni,
        edad: Number(edad),
        telefono,
        email,
        password,
      })
      .pipe(
        tap(({ user, token }) => this.handleAuthSucces({ user, token })),
        map(() => true),
        catchError((error: any) => this.handleAuthError(error)),
      );
  }

  isAdmin(): boolean {
    const token = this._token();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.is_admin === true;
    } catch {
      return false;
    }
  }
}
