import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgxIntlTelInputModule],
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent {
  registroForm: FormGroup;

  searchFields = [SearchCountryField.All];
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCountryISO = CountryISO.Ecuador;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.minLength(10)]],
      celular: [undefined, Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
    });
  }

  registrar() {
    if (this.registroForm.invalid) {
      alert('❌ Por favor completa todos los campos obligatorios.');
      return;
    }

    const formValue = this.registroForm.value;

    const datos = {
      nombre_usuario: formValue.cedula,
      password: formValue.cedula,
      rol: 'cliente',
      nombre: formValue.nombre,
      cedula: formValue.cedula,
      celular: formValue.celular?.internationalNumber || '',
      correo: formValue.correo,
      fecha_nacimiento: formValue.fechaNacimiento,

    };

    this.http.post('http://localhost:3000/api/usuarios/crear', datos)
      .subscribe({
        next: () => {
          alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']);
        },
        error: () => alert('❌ Hubo un error al registrar al cliente.')
      });
  }
}
