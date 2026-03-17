import apiClient from './apiClient';
import type { Usuario, UsuarioRequest } from '../types/Usuario';

export const usuarioApi = {
  listarTodos: async (): Promise<Usuario[]> => {
    const response = await apiClient.get<Usuario[]>('/api/usuarios');
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Usuario> => {
    const response = await apiClient.get<Usuario>(`/api/usuarios/${id}`);
    return response.data;
  },

  crear: async (data: UsuarioRequest): Promise<Usuario> => {
    const response = await apiClient.post<Usuario>('/api/usuarios', data);
    return response.data;
  },

  actualizar: async (id: number, data: UsuarioRequest): Promise<Usuario> => {
    const response = await apiClient.put<Usuario>(`/api/usuarios/${id}`, data);
    return response.data;
  },

  eliminar: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/usuarios/${id}`);
  },
};