import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard';
import {LoginComponent} from './components/auth/login/login';
import {CreatePartyComponent} from './components/create-party/create-party';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create-party', component: CreatePartyComponent },
  { path: 'admin-access-9821', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
