import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { nombre_usuario: string; password: string }) {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  registerAdmin(data: any) {
    return this.http.post(`${this.API_URL}/crear`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
