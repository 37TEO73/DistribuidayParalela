import apiClient from './apiClient';
import type { Libro, LibroRequest } from '../types/Libro';

export const libroApi = {
  listarTodos: async (): Promise<Libro[]> => {
    const response = await apiClient.get<Libro[]>('/api/libros');
    return response.data;
  },

  buscarPorIsbn: async (isbn: string): Promise<Libro> => {
    const response = await apiClient.get<Libro>(`/api/libros/${isbn}`);
    return response.data;
  },

  listarPorAutorCedula: async (cedula: string): Promise<Libro[]> => {
    const response = await apiClient.get<Libro[]>(`/api/libros/autor/${cedula}`);
    return response.data;
  },

  crear: async (data: LibroRequest): Promise<Libro> => {
    const response = await apiClient.post<Libro>('/api/libros', data);
    return response.data;
  },

  actualizar: async (isbn: string, data: LibroRequest): Promise<Libro> => {
    const response = await apiClient.put<Libro>(`/api/libros/${isbn}`, data);
    return response.data;
  },

  eliminar: async (isbn: string): Promise<void> => {
    await apiClient.delete(`/api/libros/${isbn}`);
  },
};