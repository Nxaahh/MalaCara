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

  async createParty(party: any): Promise<void> {
    const db = getDatabase();
    const partiesRef = ref(db, 'parties');
    await push(partiesRef, party);
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
          if (!party.startTime || typeof party.startTime !== 'string') return false;
          if (!party.endTime || typeof party.endTime !== 'string') return false;

          const dateParts = party.date.split('-').map(Number);
          const startParts = party.startTime.split(':').map(Number);
          const endParts = party.endTime.split(':').map(Number);

          if (
            dateParts.length !== 3 || dateParts.some(isNaN) ||
            startParts.length !== 2 || startParts.some(isNaN) ||
            endParts.length !== 2 || endParts.some(isNaN)
          ) return false;

          const [year, month, day] = dateParts;
          const [hourStart, minuteStart] = startParts;
          const [hourEnd, minuteEnd] = endParts;

          const partyStart = new Date(year, month - 1, day, hourStart, minuteStart);
          let partyEnd = new Date(year, month - 1, day, hourEnd, minuteEnd);

          // Si termina antes o igual que empieza, asumimos que termina al día siguiente
          if (partyEnd <= partyStart) {
            partyEnd.setDate(partyEnd.getDate() + 1);
          }

          // Mostramos solo las que aún no han terminado
          return now <= partyEnd;
        });


        resolve(filteredParties);

      }, (error:any) => {
        reject(error);
      });
    });
  }
}
