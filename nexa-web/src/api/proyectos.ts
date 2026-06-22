import api from './axios';
import type { Proyecto, ProyectoRequest, EstadoProyecto } from '../types';

export const getProyectos = async (): Promise<Proyecto[]> => {
  const response = await api.get<Proyecto[]>('/proyectos');
  return response.data;
};

export const getMisProyectos = async (): Promise<Proyecto[]> => {
  const response = await api.get<Proyecto[]>('/proyectos/mis-proyectos');
  return response.data;
};

export const getProyecto = async (id: string): Promise<Proyecto> => {
  const response = await api.get<Proyecto>(`/proyectos/${id}`);
  return response.data;
};

export const createProyecto = async (data: ProyectoRequest): Promise<Proyecto> => {
  const response = await api.post<Proyecto>('/proyectos', data);
  return response.data;
};

export const updateProyecto = async (id: string, data: ProyectoRequest): Promise<Proyecto> => {
  const response = await api.put<Proyecto>(`/proyectos/${id}`, data);
  return response.data;
};

export const cambiarEstadoProyecto = async (id: string, estado: EstadoProyecto): Promise<Proyecto> => {
  const response = await api.patch<Proyecto>(`/proyectos/${id}/estado`, { estado });
  return response.data;
};

export const deleteProyecto = async (id: string): Promise<void> => {
  await api.delete(`/proyectos/${id}`);
};
