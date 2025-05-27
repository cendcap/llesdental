import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  usuarioNoEncontrado = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      alert('❌ Completa todos los campos correctamente.');
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
  this.usuarioNoEncontrado = false;

  localStorage.setItem('token', res.token);

  const decodedToken: any = jwtDecode(res.token);
  const rol = decodedToken.rol;
  if (!rol) {
    alert('❌ El token no contiene información del rol.');
    return;
  }

  localStorage.setItem('rol', rol);

  if (rol === 'admin') {
    localStorage.setItem('usuario', JSON.stringify({
      tipo: 'admin',
      nombre_usuario: decodedToken.nombre_usuario,
      id_usuario: decodedToken.id
    }));
    localStorage.setItem('nombre_usuario', decodedToken.nombre_mostrar);
  } else if (rol === 'cliente') {
    localStorage.setItem('usuario', JSON.stringify({
      tipo: 'cliente',
      id_cliente: decodedToken.id,
    nombre: decodedToken.nombre,
    cedula: res.cedula,
    celular: res.celular,
    correo: res.correo
    }));
    //localStorage.setItem('cedula', res.cedula); // asegúrate de que venga del backend
    localStorage.setItem('nombre_usuario', decodedToken.nombre_mostrar);
  }

  alert(`✅ Bienvenido ${decodedToken.nombre_mostrar}`);
  this.router.navigate(['/dashboard']);
},
      error: (error) => {
        if (error.status === 404) {
          this.usuarioNoEncontrado = true;
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      }
    });
  }

  redirigirRegistroCliente() {
    this.router.navigate(['/registro-cliente']);
  }
}
