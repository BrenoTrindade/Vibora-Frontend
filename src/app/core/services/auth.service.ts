import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

import { jwtDecode } from 'jwt-decode';
import { AuthResponse, LoginQuery, RegisterUserCommand } from '../../models/auth.models';
import { DecodedToken } from '../../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient){}

  login(query: LoginQuery): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,query);
  }

  register(command: RegisterUserCommand): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, command);
  }

  getNewToken(): Observable<AuthResponse> {
    const refreshToken = this.refreshToken;
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken });
  }

  saveTokens(response: AuthResponse): void {
    localStorage.setItem('vibora_token', response.token);
    localStorage.setItem('vibora_refresh_token', response.refreshToken);
  }

  logout(): void {
    localStorage.removeItem('vibora_token');
    localStorage.removeItem('vibora_refresh_token');
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.token;
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return null;
  }

  get token(): string | null {
    return localStorage.getItem('vibora_token');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('vibora_refresh_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
