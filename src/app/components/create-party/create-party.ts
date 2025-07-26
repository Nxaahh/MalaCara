import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from '../../models/fiesta';
import { PartyService } from '../../services/party';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-create-party',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './create-party.html',
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
    photo: '' // ahora es string
  };

  selectedFile: File | null = null;

  cloudName = 'dp18ba4tj';
  unsignedUploadPreset = 'cookshare_unsigned';

  constructor(
    private partyService: PartyService,
    private router: Router,
    private http: HttpClient
  ) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  async onSubmit(): Promise<void> {
    try {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('unsignedUploadPreset ', 'cookshare_unsigned'); // ⚠️ Cambia esto por el tuyo
        formData.append('cloud_name', 'dp18ba4tj'); // ⚠️ Cambia esto por el tuyo

        const res = await fetch('https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        this.party.photo = data.secure_url; // Guarda la URL de la imagen
      }

      await this.partyService.createParty(this.party);
      this.router.navigate(['/']); // O a donde quieras redirigir
    } catch (error) {
      console.error('Error al crear fiesta:', error);
    }
  }

  uploadToCloudinary(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.unsignedUploadPreset);

    return new Promise((resolve, reject) => {
      this.http.post<any>(url, formData).subscribe({
        next: response => resolve(response.secure_url),
        error: err => reject('Error al subir imagen: ' + err.message)
      });
    });
  }
}
