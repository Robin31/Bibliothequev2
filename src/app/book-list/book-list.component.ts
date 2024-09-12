import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../models/book.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  booksSubscription!: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService
      .getBooks()
      .then((receivedBooks) => (this.books = receivedBooks));
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}
