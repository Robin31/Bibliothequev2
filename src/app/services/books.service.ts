import { Injectable } from '@angular/core';
import { Book } from '../models/book.models';
import { Subject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Database, ref, onValue, set } from '@angular/fire/database';
import {
  getDownloadURL,
  ref as storageRef,
  getStorage,
  deleteObject,
  StorageReference,
  uploadBytesResumable,
  UploadTaskSnapshot,
  Storage,
  FirebaseStorage,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  // storage!: string;

  constructor(private database: Database, private storage: Storage) {}

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    set(ref(this.database, `/books`), this.books);
  }

  getBooks(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      onValue(
        ref(this.database, `/books`),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            resolve(data);
          } else {
            resolve([]);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getSingleBook(id: number): Promise<Book> {
    return new Promise((resolve, reject) => {
      onValue(
        ref(this.database, `/books/${id}`),
        (snapshot) => {
          if (snapshot.exists()) {
            const book: Book = snapshot.val();
            resolve(book);
          } else {
            console.log('No data available');
            reject(new Error('No data available'));
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    // const storage: FirebaseStorage = getStorage();
    // const toto: StorageReference = storageRef(storage, `image/${book.photo}`);
    // deleteObject(toto)
    //   .then(() => {
    //     console.log('photo supprimé !');
    //   })
    //   .catch((error) => {
    //     console.log('Dommage : ' + error);
    //   });

    const bookIndexToRemove = this.books.findIndex((bookEl) => {
      if (bookEl === book) {
        return true;
      }
      return false;
    });
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  //   uploadFile(file: File): Promise<string> {
  //     return new Promise((resolve, reject) => {
  //       const storageReference: StorageReference = storageRef(
  //         this.storage,
  //         `images/${file.name}`
  //       );
  //       const upload = uploadBytesResumable(storageReference, file);

  //       upload.on(
  //         'state_changed',
  //         (snapshot: UploadTaskSnapshot) => {
  //           console.log('chargement...');
  //         },
  //         (error) => {
  //           reject(error);
  //         },
  //         async () => {
  //           try {
  //             const downloadURL = await getDownloadURL(upload.snapshot.ref);
  //             resolve(downloadURL);
  //           } catch (error) {
  //             reject(error);
  //           }
  //         }
  //       );
  //     });
  //   }
}
