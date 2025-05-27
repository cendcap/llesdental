import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.css']
})
export class FormularioReservaComponent implements OnInit {
  isBrowser: boolean = false;
  reservaForm!: FormGroup;
  minDate: string;
  horasDisponibles: string[] = [];
  horasDisponiblesFiltradas: string[] = [];
  cliente: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.generarHorasDisponibles();
  }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });

    this.horasDisponiblesFiltradas = [...this.horasDisponibles];
    this.recargarDatosCliente();

    // Detectar cambios en la fecha seleccionada
    this.reservaForm.get('fecha')?.valueChanges.subscribe((fechaSeleccionada: string) => {
      this.onFechaChange(fechaSeleccionada);
    });
  }

  recargarDatosCliente(): void {
    if (this.isBrowser) {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        this.cliente = JSON.parse(usuario);
        console.log('Cliente recargado:', this.cliente);
      } else {
        alert('❌ No hay sesión activa');
      }
    }
  }

  generarHorasDisponibles(): void {
    const inicio = 8;
    const fin = 17;
    const intervalo = 30;

    for (let hora = inicio; hora <= fin; hora++) {
      this.horasDisponibles.push(this.formatearHora(hora, 0));
      if (hora !== fin) {
        this.horasDisponibles.push(this.formatearHora(hora, intervalo));
      }
    }
  }

  formatearHora(hora: number, minutos: number): string {
    const h = hora.toString().padStart(2, '0');
    const m = minutos.toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  onFechaChange(fechaSeleccionada: string): void {
    if (!fechaSeleccionada) {
      this.horasDisponiblesFiltradas = [...this.horasDisponibles];
      return;
    }

    this.http.get<{ reservadas: string[], bloqueadas: string[] }>(
      `http://localhost:3000/api/citas/horas-no-disponibles?fecha=${fechaSeleccionada}`
    ).subscribe({
      next: (res) => {
        const horasOcupadas = [...res.reservadas, ...res.bloqueadas];
        this.horasDisponiblesFiltradas = this.horasDisponibles.filter(h => !horasOcupadas.includes(h));
        console.log('Horas ocupadas:', horasOcupadas);
      },
      error: (err) => {
        console.error('❌ Error al obtener horas no disponibles', err);
        this.horasDisponiblesFiltradas = [...this.horasDisponibles];
      }
    });
  }

  enviarFormulario(): void {
    if (this.isBrowser) {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        this.cliente = JSON.parse(usuario);
      }
    }

    if (this.reservaForm.invalid || !this.cliente) {
      alert('❌ Completa los campos de fecha y hora');
      return;
    }

    const { fecha, hora } = this.reservaForm.value;
    const datos = {
      id_usuario: this.cliente.id_cliente,
      fecha,
      hora
    };

    console.log('Enviando datos:', datos);

    this.http.post('http://localhost:3000/api/citas/nueva', datos).subscribe({
      next: () => alert('✅ Reserva enviada'),
      error: (err) => {
        console.error('Error al enviar reserva:', err);
        if (err.status === 409) {
          alert('❌ Ya hay una cita en ese horario');
        } else {
          alert('❌ Error al enviar reserva');
        }
      }
    });
  }
}
