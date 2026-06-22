import api from './axios';
import type { AuthResponse } from '../types';

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const payload = {
    correo: data.correo,
    password: data.contrasena
  };
  const response = await api.post<any>('/auth/login', payload);
  const rd = response.data;
  
  return {
    accessToken: rd.accessToken,
    refreshToken: rd.refreshToken,
    usuario: {
      id: rd.id,
      nombre: rd.nombre,
      correo: rd.correo,
      rol: rd.rol
    }
  };
};
