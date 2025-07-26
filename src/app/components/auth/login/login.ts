import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor completa email y contraseña');
      return;
    }

    this.authService.login(this.email, this.password)
      .then(() => {
        alert('¡Login exitoso!');
        // Aquí puedes redirigir a la página principal o dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch(err => alert('Error: ' + err.message));
  }
}
