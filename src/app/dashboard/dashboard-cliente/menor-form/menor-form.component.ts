import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-menor-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './menor-form.component.html',
  styleUrl: './menor-form.component.css'
})
export class MenorFormComponent {
  menorForm!: FormGroup;
  edad: number = 0;
  idRepresentante!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cliente = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.idRepresentante = cliente.id_cliente || cliente.id;

      if (!this.idRepresentante) {
        alert("⚠️ No se encontró información del representante. Asegúrate de estar logueado.");
        return;
      }

      this.menorForm = this.fb.group({
        nombre: ['', Validators.required],
        cedula: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', Validators.required],
      });

      this.menorForm.get('fechaNacimiento')?.valueChanges.subscribe(value => {
        if (value) {
          this.edad = this.calcularEdad(value);
        }
      });
    }
  }

  calcularEdad(fecha: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  registrarMenor() {
    if (this.menorForm.invalid) {
      alert('❗ Completa los campos obligatorios.');
      return;
    }

    const formValue = this.menorForm.value;
    const edad = this.calcularEdad(formValue.fechaNacimiento);

    if (edad >= 18) {
      alert("⚠️ Este formulario es solo para menores de edad.");
      return;
    }

    const menor = {
      nombre: formValue.nombre,
      cedula: formValue.cedula,
      celular: formValue.celular,
      correo: formValue.correo,
      fechaNacimiento: formValue.fechaNacimiento,
      id_representante: this.idRepresentante
    };
    console.log("📦 Datos a enviar:", menor);
    this.http.post('http://localhost:3000/api/clientes/registrar-menor', menor).subscribe({
      next: () => alert("✅ Menor registrado correctamente"),
      error: (err) => alert("❌ Error al registrar menor: " + (err.error?.message || err.message))
    });
  }
}
