import { Injectable } from '@angular/core';
import { Database, ref, push } from '@angular/fire/database';
import { Contacto } from '../models/contacto';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private db: Database) {}

  crearContacto(contacto: Contacto) {
    const contactoConFecha = { ...contacto, fecha: new Date().toISOString() };
    const contactosRef = ref(this.db, 'contactos'); // Aquí obtenemos el DatabaseReference correcto
    return push(contactosRef, contactoConFecha); // push recibe DatabaseReference y datos
  }

  // Para obtener contactos con API modular, habría que usar observables y onValue/ref pero es más complejo
}
