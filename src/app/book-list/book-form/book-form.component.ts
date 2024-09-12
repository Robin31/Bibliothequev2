import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.models';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  fileIsUploading = false;
  fileUrl!: string;
  fileUploaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title')!.value;
    const author = this.bookForm.get('author')!.value;
    const newBook = new Book(title, author);
    // if (this.fileUrl && this.fileUrl !== '') {
    //   newBook.photo = this.fileUrl;
    // }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  // onUploadFile(file: File) {
  //   this.fileIsUploading = true;
  //   this.booksService.uploadFile(file).then((url: string) => {
  //     this.fileUrl = url;
  //     this.fileIsUploading = false;
  //     this.fileUploaded = true;
  //   });
  // }

  // detectFiles(event: any) {
  //   this.onUploadFile(event.target.files[0]);
  // }
}
