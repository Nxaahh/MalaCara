import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Database, ref, set } from '@angular/fire/database';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private db: Database) {
    this.auth.onAuthStateChanged(user => {
      this.loggedIn.next(!!user);
    });
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  register(email: string, password: string, name?: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        return set(ref(this.db, `users/${uid}`), {
          email,
          name: name || '',
          role: 'manager',
          createdAt: new Date().toISOString()
        }).then(() => userCredential);
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
