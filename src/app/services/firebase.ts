import { Injectable } from '@angular/core';
import { Database, ref, set, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: Database) {}

  // Crear/actualizar un gerente
  createManager(uid: string, data: any) {
    return set(ref(this.db, `users/${uid}`), data);
  }

  // Leer un gerente
  getManager(uid: string) {
    const dbRef = ref(this.db);
    return get(child(dbRef, `users/${uid}`));
  }
}
