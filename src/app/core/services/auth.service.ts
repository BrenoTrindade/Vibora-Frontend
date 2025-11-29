import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

import { jwtDecode } from 'jwt-decode';
import { AuthResponse, LoginQuery, RegisterUserCommand } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl = `${environment.apiUrl}/api/Users`;

  constructor(private http: HttpClient){}

  login(query: LoginQuery): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,query);
  }

  register(command: RegisterUserCommand): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, command);
  }

  saveTokens(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getDecodedToken(): any {
    const token = this.token;
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
