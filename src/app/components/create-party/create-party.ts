import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from '../../models/fiesta';
import { PartyService } from '../../services/party';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.html',
  imports: [FormsModule],
  styleUrls: ['./create-party.css']
})
export class CreatePartyComponent {

  party: Party = {
    name: '',
    place: '',
    date: '',
    startTime: '',
    endTime: '',
    ticketsAvailable: true,
    dressCode: '',
    musicType: '',
    photos: []
  };

  selectedFiles: File[] = [];

  constructor(private partyService: PartyService, private router: Router) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFiles = Array.from(event.target.files);
      // Opcional: Mostrar en consola qué archivos se han seleccionado
      console.log('Archivos seleccionados:', this.selectedFiles);
    }
  }

  onSubmit() {
    // Por ahora no subimos fotos, solo guardamos la fiesta sin ellas
    this.partyService.addParty(this.party)
      .then(() => {
        alert('Fiesta creada con éxito!');
        this.router.navigate(['/dashboard']);
      })
      .catch(error => alert('Error al crear fiesta: ' + error));
  }
}
