import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  MaybeAsync,
} from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isAuth!: boolean;

  constructor(
    private router: Router,
    // private auth: Auth,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<boolean> | Promise<boolean> | boolean {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/auth', 'signin']);
          resolve(false);
        }
      });
    });
  }
}
