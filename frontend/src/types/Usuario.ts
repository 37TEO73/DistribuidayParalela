export type TipoUsuario = 'ADMIN' | 'EMPLEADO';

export interface Usuario {
  id: number;
  userName: string;
  tipo: TipoUsuario;
}

export interface UsuarioRequest {
  userName: string;
  password: string;
  tipo: TipoUsuario;
}