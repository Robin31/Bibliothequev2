import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.models';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.css',
})
export class SingleBookComponent implements OnInit {
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then((book: Book) => {
      this.book = book;
    });
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onBack() {
    this.router.navigate(['/books']);
  }
}
