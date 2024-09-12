import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  createNewUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOutUser() {
    this.auth.signOut();
  }
}
