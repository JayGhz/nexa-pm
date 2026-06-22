import api from './axios';
import type { Asignacion } from '../types';

export interface AsignacionRequest {
  proyectoId: string;
  usuarioId: string;
  horasAsignadas: number;
}

export const getAsignaciones = async (): Promise<Asignacion[]> => {
  const response = await api.get<Asignacion[]>('/asignaciones');
  return response.data;
};

export const getAsignacionesByProyecto = async (proyectoId: string): Promise<Asignacion[]> => {
  const response = await api.get<Asignacion[]>(`/asignaciones/proyecto/${proyectoId}`);
  return response.data;
};

export const createAsignacion = async (data: AsignacionRequest): Promise<Asignacion> => {
  const response = await api.post<Asignacion>('/asignaciones', data);
  return response.data;
};

export const deleteAsignacion = async (id: string): Promise<void> => {
  await api.delete(`/asignaciones/${id}`);
};
