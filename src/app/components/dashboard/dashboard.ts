// Importa también OnInit y Party (ya lo tienes)
import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../services/party';
import { Party } from '../../models/fiesta';
import {Router} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [
    NgClass,
    NgForOf,
    NgIf,
  ]
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  parties: Party[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(  private authService: AuthService,private partyService: PartyService,  private router: Router) {
    this.authService.isLoggedIn.subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
    this.partyService.getParties()
      .then(parties => {
        this.parties = parties;
        this.isLoading = false;
      })
      .catch(err => {
        this.errorMessage = 'Error cargando fiestas';
        console.error(err);
        this.isLoading = false;
      });
  }

  // Devuelve el estado de la fiesta según la fecha y hora
  getPartyStatus(party: Party): string {
    const now = new Date();

    const [year, month, day] = party.date.split('-').map(Number);
    const [hourStart, minuteStart] = party.startTime.split(':').map(Number);
    const [hourEnd, minuteEnd] = party.endTime.split(':').map(Number);

    const start = new Date(year, month - 1, day, hourStart, minuteStart);
    let end = new Date(year, month - 1, day, hourEnd, minuteEnd);

    // Si la hora de fin es menor o igual que la hora de inicio, asumimos que termina al día siguiente
    if (end <= start) {
      end.setDate(end.getDate() + 1);
    }

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'ongoing';
    return 'ended';
  }


  addParty() {
    this.router.navigate(['/create-party']);
  }
}
