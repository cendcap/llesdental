import { Component, Inject, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { CitasService } from '../services/citas.service';

const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];

@Component({
  selector: 'app-calendario-citas',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario-citas.component.html',
  styleUrls: ['./calendario-citas.component.css']
})
export class CalendarioCitasComponent implements OnInit {
  private citasService = inject(CitasService);
  isBrowser: boolean;
  calendarOptions: any = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.calendarOptions = {
        initialView: 'dayGridMonth', // Cambiar vista inicial a mes
        locale: esLocale,
        plugins: calendarPlugins,
        titleFormat: { year: 'numeric', month: 'long' },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth,listYear' // Agregar vistas
        },
        views: {
          listYear: {
            type: 'list',
            duration: { years: 1 },
            buttonText: 'Año'
          }
        },
        slotMinTime: '08:00:00',     // hora mínima
        slotMaxTime: '17:00:00',     // hora máxima (exclusiva)
        slotDuration: '00:30:00', // Dividir en medias horas
        slotLabelFormat: [
          { hour: '2-digit', minute: '2-digit', hour12: true } // Mostrar hora en las filas
        ],
        nowIndicator: true,
        allDaySlot: false,
        height: 'auto',
        events: []
      };

      this.cargarCitas();
    }
  }

  cargarCitas(): void {
    this.citasService.obtenerCitas().subscribe(citas => {
      const eventos = citas.map(cita => {
        const start = this.formatearFechaHora(cita.fecha, cita.hora);
        const end = this.calcularFin(cita.fecha, cita.hora);

        return {
          title: `🧑 ${cita.nombre} - ${cita.estado}`,
          start,
          end,
          color: this.getColorPorEstado(cita.estado)
        };
      });

      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };
    });
  }

  formatearFechaHora(fecha: string, hora: string): string {
    const fechaLocal = new Date(fecha);
    const [h, m, s] = hora.split(':').map(Number);
    fechaLocal.setHours(h, m, s);
    return fechaLocal.toISOString();
  }

  calcularFin(fecha: string, hora: string): string {
    const fechaLocal = new Date(fecha);
    const [h, m] = hora.split(':').map(Number);
    fechaLocal.setHours(h, m, 0);
    fechaLocal.setMinutes(fechaLocal.getMinutes() + 30);
    return fechaLocal.toISOString();
  }

  getColorPorEstado(estado: string): string {
    switch (estado) {
      case 'reservado': return 'green';
      case 'atendiendo': return 'orange';
      case 'atendido': return 'blue';
      default: return 'gray';
    }
  }
}
