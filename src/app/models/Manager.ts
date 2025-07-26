export interface Manager {
  uid?: string;         // UID que da Firebase Auth
  email: string;        // Email
  name?: string;        // Nombre opcional
  role: 'manager';      // Para identificar rol
  createdAt?: string;   // Fecha de creación (ISO string)
}
