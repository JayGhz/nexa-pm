import api from './axios';
import type { Cliente } from '../types';

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>('/clientes');
  return response.data;
};

export const getCliente = async (id: string): Promise<Cliente> => {
  const response = await api.get<Cliente>(`/clientes/${id}`);
  return response.data;
};
