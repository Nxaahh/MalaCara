import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard';
import {LoginComponent} from './components/auth/login/login';
import {CreatePartyComponent} from './components/create-party/create-party';
import {ContactFormComponent} from './components/contact-form/contact-form';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create-party', component: CreatePartyComponent },
  { path: 'admin-access-9821', component: LoginComponent },
  { path: 'contacto', component: ContactFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
