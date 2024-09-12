import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthGuardService } from './services/auth-guard.service';
import { ButtonModule } from 'primeng/button';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  {
    path: 'books',
    canActivate: [AuthGuardService],
    component: BookListComponent,
  },
  {
    path: 'books/new',
    canActivate: [AuthGuardService],
    component: BookFormComponent,
  },
  {
    path: 'books/view/:id',
    canActivate: [AuthGuardService],
    component: SingleBookComponent,
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'books',
  },
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'bibliotheque-20fe7',
        appId: '1:610072411918:web:7aef63501ee3e6dad6215f',
        storageBucket: 'bibliotheque-20fe7.appspot.com',
        apiKey: 'AIzaSyBO8CYg7CqRiZC6ZzxqzfQv-UgmGmUZS3M',
        authDomain: 'bibliotheque-20fe7.firebaseapp.com',
        messagingSenderId: '610072411918',
        measurementId: 'G-NJ32C2KC7J',
        databaseURL:
          'bibliotheque-20fe7-default-rtdb.europe-west1.firebasedatabase.app',
      })
    ),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
