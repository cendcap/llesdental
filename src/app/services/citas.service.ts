// src/app/services/citas.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cita {
    id: number;
    fecha: string;
    hora: string;
    estado: string;
    cliente_id: number;
    nombre: string; // opcional si lo unes en backend
  }

@Injectable({ providedIn: 'root' })
export class CitasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/citas'; // Ajusta el endpoint según tu ruta

  constructor() {}
  obtenerCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todas`);
  }
}
