import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {App} from './app/app';
import {environment} from './enviroments/enviroments';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import 'bootstrap/dist/css/bootstrap.min.css';


bootstrapApplication(App, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    importProvidersFrom(HttpClientModule, ReactiveFormsModule),
    provideRouter(routes),
  ]
});
