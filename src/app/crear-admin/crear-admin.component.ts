import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.css']
})
export class CrearAdminComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.adminForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  crearAdministrador() {
    if (this.adminForm.invalid) {
      alert('❌ Por favor completa todos los campos');
      return;
    }

    const datos = {
      nombre_usuario: this.adminForm.value.nombre_usuario,
      password: this.adminForm.value.password,
      rol: 'admin' // 🔐 Aseguramos que se registre como admin
    };
    console.log('Datos a enviar:', datos); // Verifica los datos en la consola

    this.http.post('http://localhost:3000/api/usuarios/crear', datos).subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta del servidor:', res);
        alert('✅ Administrador creado exitosamente');
        this.adminForm.reset();
      },
      error: (err) => {
        console.error('❌ Error al crear admin:', err);
        alert(err.error?.message || '❌ Error al crear administrador');
      }
    });
  }
}
