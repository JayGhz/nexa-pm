import api from './axios';
import type { Seguimiento } from '../types';

export interface SeguimientoRequest {
  proyectoId: string;
  fecha: string;
  avance: number;
  comentario: string;
}

export const getSeguimientosByProyecto = async (proyectoId: string): Promise<Seguimiento[]> => {
  const response = await api.get<Seguimiento[]>(`/seguimiento/proyecto/${proyectoId}`);
  return response.data;
};

export const createSeguimiento = async (data: SeguimientoRequest): Promise<Seguimiento> => {
  const response = await api.post<Seguimiento>('/seguimiento', data);
  return response.data;
};

export const deleteSeguimiento = async (id: string): Promise<void> => {
  await api.delete(`/seguimiento/${id}`);
};
