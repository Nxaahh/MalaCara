import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './app/app';
import { environment } from './enviroments/enviroments';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule) // <--- Añadido para HttpClient
  ]
}).catch(err => console.error(err));
