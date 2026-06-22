import api from './axios';
import type { RegistroHoras, RegistroHorasRequest } from '../types';

export const registrarHoras = async (request: RegistroHorasRequest): Promise<RegistroHoras> => {
  const response = await api.post<RegistroHoras>('/registro-horas', request);
  return response.data;
};

export const getHistorialHoras = async (proyectoId: string): Promise<RegistroHoras[]> => {
  const response = await api.get<RegistroHoras[]>(`/registro-horas/proyecto/${proyectoId}`);
  return response.data;
};
