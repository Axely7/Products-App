// Generated by https://quicktype.io

export interface LoginData {
  correo: string;
  password: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  nombre: string;
  correo: string;
  rol: string;
  estado: boolean;
  google: boolean;
  uid: string;
  img?: string;
}

export interface RegisterData {
  correo: string;
  password: string;
  nombre: string;
}

// Generated by https://quicktype.io

export interface ProductsResponse {
  total: number;
  productos: Producto[];
}

export interface Producto {
  _id: string;
  nombre: string;
  estado: boolean;
  usuario: Categoria;
  precio: number;
  categoria: Categoria;
  disponible: boolean;
  img?: string;
}

// Generated by https://quicktype.io

export interface CategoriesResponse {
  total: number;
  categorias: Categoria[];
}

export interface Categoria {
  _id: string;
  nombre: string;
  estado?: boolean;
  usuario?: CreadoPor;
}

export interface CreadoPor {
  _id: string;
  nombre: string;
}
