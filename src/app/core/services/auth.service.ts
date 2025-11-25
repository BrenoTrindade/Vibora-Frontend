import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

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

  logout(): void {
    localStorage.removeItem('token');
  }
}
