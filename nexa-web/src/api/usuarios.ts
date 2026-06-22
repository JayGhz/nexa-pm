import api from './axios';
import type { Usuario } from '../types';

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get<Usuario[]>('/usuarios');
  return response.data;
};

export const updateUsuario = async (id: string, data: Partial<Usuario>): Promise<Usuario> => {
  const response = await api.put<Usuario>(`/usuarios/${id}`, data);
  return response.data;
};
