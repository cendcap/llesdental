import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CalendarioCitasComponent } from '../../calendario-citas/calendario-citas.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    CalendarioCitasComponent
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  isSmallScreen: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private http: HttpClient
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnInit(): void {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');
  const nombre_usuario = localStorage.getItem('nombre_usuario');

  if (token && rol === 'cliente') {
    this.nombreUsuario = nombre_usuario || 'Cliente';
  } else if (token && rol === 'admin') {
    this.nombreUsuario = nombre_usuario || 'Admin';
  } else {
    this.nombreUsuario = 'Usuario';
  }

  console.log('Nombre cargado:', this.nombreUsuario);
}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('cedula');
    localStorage.removeItem('nombre_usuario');
    this.router.navigate(['/login']);
  }
}
