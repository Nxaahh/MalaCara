import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import 'bootstrap/dist/css/bootstrap.min.css';


import { App } from './app/app';
import {environment} from './enviroments/enviroments';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
bootstrapApplication(App, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
