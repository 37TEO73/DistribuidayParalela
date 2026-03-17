export type RolUsuario = 'ADMIN' | 'EMPLEADO';

export interface AuthUser {
  id: number;
  userName: string;
  tipo: RolUsuario;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  userName: string;
  tipo: RolUsuario;
  token: string;
  mensaje: string;
}