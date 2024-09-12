import { Component, OnInit } from '@angular/core';
import { User, onAuthStateChanged, Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuth!: boolean;

  constructor(private auth: Auth, private authService: AuthService) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  onSignOut(): void {
    this.authService.signOutUser();
  }
}
