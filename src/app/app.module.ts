import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BookComponent} from './book/book.component';
import {BookListComponent} from './book-list/book-list.component';
import {SearchComponent} from './search/search.component';
import {LibraryComponent} from './library/library.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {GoogleBooksService} from './shared/google-books.service';
import {PagerComponent} from './pager/pager.component';
import {LibraryService} from './shared/library.service';
//import {CacheService} from './shared/cache.service';
//import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
//import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { NgProgressRouterModule } from '@ngx-progressbar/router';
 




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    BookListComponent,
    SearchComponent,
    LibraryComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgProgressModule.forRoot(),
   // NgProgressHttpModule.forRoot(),
    //HttpClientModule
    NgProgressModule.forRoot(),
    NgProgressRouterModule.forRoot()
   
      
  ],
  providers: [GoogleBooksService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
