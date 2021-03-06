import { map,tap } from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config/app-config.module';

import {Book} from './book';

@Injectable()
export class GoogleBooksService {
  //private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public initialised: boolean = false;
  public totalItems: number = 0;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string = "";
  public books: Book[];


  constructor(private http: HttpClient,@Inject(APP_CONFIG) private config: AppConfig) {
  }

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get page(): number {
    return this._page;
  }

  set page(val: number) {
    if (val !== this.page) {
      this._page = val;
      this.searchBooks(this.query);
    }
  }


  public searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.books = [];
    this.http.get(`${this.config.apiEndpoint}?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`).pipe(
       
        tap(data => {
          const res :any =data;
          this.totalItems = res.totalItems;
        }),
        map(data => {
          const res :any =data;
          return res.items ? res.items : [];
        }),
        map(items => {
          return items.map(item => this.bookFactory(item))
        }),

        tap(_ => this.loading = false)

    ).subscribe((books) => this.books = books)

  }

  retrieveBook(bookId: string) {
    return this.http.get(`${this.config.apiEndpoint}/${bookId}`)
  }

  public bookFactory(item: any): Book {
    return new Book(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories ? item.volumeInfo.categories.map((item) => item.split("/").pop().trim()) : ['N/A'],
      item.volumeInfo.imageLinks.thumbnail,
      item.volumeInfo.imageLinks.smallThumbnail
    );
  }
}
