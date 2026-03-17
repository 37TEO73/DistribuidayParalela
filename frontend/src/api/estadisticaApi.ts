import apiClient from './apiClient';
import type { EstadisticaAutor } from '../types/Estadistica';

export const estadisticaApi = {
  obtenerLibrosPorAutor: async (): Promise<EstadisticaAutor[]> => {
    const response = await apiClient.get<EstadisticaAutor[]>('/api/estadisticas/libros-por-autor');
    return response.data;
  },
};