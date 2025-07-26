import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../../services/auth';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './sigin.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    if (!this.email || !this.password) {
      alert('Completa email y contraseña');
      return;
    }

    this.authService.register(this.email, this.password, this.name)
      .then(() => {
        alert('Gerente registrado con éxito');
        this.email = '';
        this.password = '';
        this.name = '';
      })
      .catch(err => alert('Error: ' + err.message));
  }
}
