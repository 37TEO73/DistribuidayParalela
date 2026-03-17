export interface Libro {
  isbn: string;
  titulo: string;
  editorial: string;
  genero: string;
  anioPublicacion: number;
  autor: {
    cedula: string;
    nombreCompleto: string;
    nacionalidad: string;
  };
}

export interface LibroRequest {
  isbn: string;
  titulo: string;
  editorial: string;
  genero: string;
  anioPublicacion: number;
  autorCedula: string;
}