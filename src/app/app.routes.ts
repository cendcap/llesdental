import { Routes } from '@angular/router';
import { FormularioReservaComponent } from './formulario-reserva/formulario-reserva.component';
import { CrearAdminComponent } from './crear-admin/crear-admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { DashboardClienteComponent } from './dashboard/dashboard-cliente/dashboard-cliente.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirección de la raíz
  { path: 'login', component: LoginComponent },
  { path: 'crear-admin', component: CrearAdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro-cliente', component: RegistroClienteComponent },
  {
    path: 'dashboard-cliente',
    component: DashboardClienteComponent,
    children: [
      {
        path: 'clientes', // O usa "reserva" si prefieres
        loadComponent: () => import('../app/formulario-reserva/formulario-reserva.component').then(m => m.FormularioReservaComponent)
      },
      {
        path: 'representados', // O usa "reserva" si prefieres
        loadComponent: () => import('./dashboard/dashboard-cliente/menor-form/menor-form.component').then(m => m.MenorFormComponent)
      },
    ]
    
  }
  
];