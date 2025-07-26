import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import {RegisterComponent} from './components/auth/sigin/sigin';
import {LoginComponent} from './components/auth/login/login';
import {DashboardComponent} from './components/dashboard/dashboard';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponent, LoginComponent,DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MalaKara');
}
