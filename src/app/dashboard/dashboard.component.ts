import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <ng-container *ngIf="rol === 'admin'">
      <app-dashboard-admin />
    </ng-container>
    <ng-container *ngIf="rol === 'cliente'">
      <app-dashboard-cliente />
    </ng-container>
  `,
  imports: [DashboardAdminComponent, DashboardClienteComponent, CommonModule],
})
export class DashboardComponent implements OnInit {
  rol: string | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verifica si estamos en el navegador antes de acceder a localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.rol = localStorage.getItem('rol'); // Asegúrate de guardar 'admin' o 'cliente' al loguear

      // Depuración: Verifica el valor de 'rol' en la consola
      console.log('Rol1 en localStorage:', this.rol);
      console.log('nombre:', localStorage.getItem('nombre_usuario'));
    }

    if (!this.rol) {
      // Si no existe el rol, redirige al login
      console.log('No se encontró rol, redirigiendo al login');
      this.router.navigate(['/login']);
    }
  }
}