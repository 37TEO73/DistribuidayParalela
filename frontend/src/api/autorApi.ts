import apiClient from './apiClient';
import type { Autor, AutorRequest } from '../types/Autor';

export const autorApi = {
  listarTodos: async (): Promise<Autor[]> => {
    const response = await apiClient.get<Autor[]>('/api/autores');
    return response.data;
  },

  buscarPorCedula: async (cedula: string): Promise<Autor> => {
    const response = await apiClient.get<Autor>(`/api/autores/${cedula}`);
    return response.data;
  },

  crear: async (data: AutorRequest): Promise<Autor> => {
    const response = await apiClient.post<Autor>('/api/autores', data);
    return response.data;
  },

  actualizar: async (cedula: string, data: AutorRequest): Promise<Autor> => {
    const response = await apiClient.put<Autor>(`/api/autores/${cedula}`, data);
    return response.data;
  },

  eliminar: async (cedula: string): Promise<void> => {
    await apiClient.delete(`/api/autores/${cedula}`);
  },
};