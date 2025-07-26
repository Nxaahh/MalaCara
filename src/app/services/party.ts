// src/app/services/party.service.ts
import { Injectable } from '@angular/core';
import {Database, ref, push, set, getDatabase, onValue} from '@angular/fire/database';
import {Party} from '../models/fiesta';
@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private partiesRef;

  constructor(private db: Database) {
    this.partiesRef = ref(this.db, 'parties');
  }

  addParty(party: Party): Promise<void> {
    const newPartyRef = push(this.partiesRef);
    party.id = newPartyRef.key!;
    party.createdAt = new Date().toISOString();
    return set(newPartyRef, party);
  }
  getParties(): Promise<Party[]> {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const partiesRef = ref(db, 'parties');

      onValue(partiesRef, (snapshot) => {
        const partiesObj = snapshot.val();
        if (!partiesObj) {
          resolve([]);  // No hay fiestas
          return;
        }

        const parties: Party[] = Object.values(partiesObj);

        const now = new Date();

        // Filtrar fiestas en curso o próximas:
        const filteredParties = parties.filter(party => {
          if (!party.date || typeof party.date !== 'string') return false;
          if (!party.endTime || typeof party.endTime !== 'string') return false;

          const dateParts = party.date.split('-').map(Number);
          if (dateParts.length !== 3 || dateParts.some(isNaN)) return false;

          const timeParts = party.endTime.split(':').map(Number);
          if (timeParts.length !== 2 || timeParts.some(isNaN)) return false;

          const [year, month, day] = dateParts;
          const [hourEnd, minuteEnd] = timeParts;
          // Crear fecha inicio y fin
          const partyStart = new Date(year, month - 1, day);
          // Hora final, si es pasada la medianoche, asumo que termina al día siguiente
          const partyEnd = new Date(year, month - 1, day, hourEnd, minuteEnd);

          // Si la hora de fin es menor a la hora de inicio, asumo que termina al día siguiente
          if (partyEnd < partyStart) {
            partyEnd.setDate(partyEnd.getDate() + 1);
          }

          // Queremos fiestas cuyo rango contenga ahora o que aún no hayan empezado:
          return now <= partyEnd;
        });

        resolve(filteredParties);

      }, (error:any) => {
        reject(error);
      });
    });
  }
}
