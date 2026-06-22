export type Rol = 'ADMIN' | 'CONSULTOR';

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: Rol;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  usuario: Usuario;
}

export type EstadoProyecto = 'PLANEADO' | 'EN_EJECUCION' | 'PAUSADO' | 'FINALIZADO';

export interface Cliente {
  id: string;
  razonSocial: string;
  sector: string;
  contacto: string;
  correo: string;
  telefono: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  estado: EstadoProyecto;
  presupuesto: number;
  fechaInicio: string;
  fechaFin: string;
  clienteId: string;
  clienteNombre: string;
  clienteSector: string;
  ultimoAvance?: number;
  totalConsultores?: number;
}

export interface ProyectoRequest {
  nombre: string;
  descripcion: string;
  estado: EstadoProyecto;
  presupuesto: number;
  fechaInicio: string;
  fechaFin: string;
  clienteId: string;
}

export interface Asignacion {
  id: string;
  proyectoId: string;
  proyectoNombre: string;
  usuarioId: string;
  usuarioNombre: string;
  usuarioCorreo: string;
  horasAsignadas: number;
  fechaAsignacion: string;
}

export interface Seguimiento {
  id: string;
  proyectoId: string;
  fecha: string;
  avance: number;
  comentario: string;
}

export interface ProyectoResumen {
  id: string;
  nombre: string;
  estado: string;
  clienteNombre: string;
  ultimoAvance?: number;
  historial?: { fecha: string; avance: number }[];
}

export interface ActividadDiariaDTO {
  fecha: string;
  horasPorProyecto: Record<string, number>;
}

export interface DashboardResumen {
  totalProyectosActivos: number;
  totalConsultores: number;
  presupuestoTotal: number;
  proyectosCompletados: number;
  proyectosPorEstado: Record<string, number>;
  avancePromedioGeneral: number;
  proyectosRecientes: {
    id: string;
    nombre: string;
    estado: string;
    clienteNombre: string;
    ultimoAvance: number;
    historial: { fecha: string; avance: number }[];
  }[];
  historialActividad: {
    fecha: string;
    proyectos: Record<string, number>;
  }[];
  proyectos?: Proyecto[];
}

export interface RegistroHoras {
  id: number;
  proyectoId: string;
  proyectoNombre: string;
  consultorId: string;
  consultorNombre: string;
  fecha: string;
  horasTrabajadas: number;
  descripcion: string;
  fechaCreacion: string;
}

export interface RegistroHorasRequest {
  proyectoId: string;
  fecha: string;
  horasTrabajadas: number;
  descripcion: string;
}
