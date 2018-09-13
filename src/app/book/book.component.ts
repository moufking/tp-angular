import {Component} from '@angular/core';
import {Book} from '../shared/book';
import {Router, ActivatedRoute} from '@angular/router';
import {GoogleBooksService} from '../shared/google-books.service';
import {LibraryService} from '../shared/library.service';
//import {CacheService} from '../shared/cache.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  book: Book;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private googleBooksService: GoogleBooksService,
              private libraryService: LibraryService,
             ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if ( params['bookId'] ) {
        this.getBook (params['bookId']);

      }
    });
  }


  getBook(bookId: string) {
    this.googleBooksService.retrieveBook(bookId)
        .subscribe(value => {
          console.log(value);
          this.book = this.googleBooksService.bookFactory(value);
          console.log(this.book);
        });
  }

  hasBook(book: Book): boolean {
    if (book) {
      console.log(book);
     return this.libraryService.hasBook(book);
    // return this.cacheService.hasValidCachedValue(book);
     
    }


  }

  addBook(book: Book) {

    if (book) {
      console.log(book);
      return this.libraryService. addBook(book);
    }

  }

  removeBook(book: Book) {
    if (book) {
      return this.libraryService.removeBook(book);
    }
  }
}
