import {Routes} from '@angular/router';
import {LibraryComponent} from './library/library.component';
import {SearchComponent} from './search/search.component';
import {BookComponent} from './book/book.component';


export const routes: Routes = [

    {path: 'library', component: LibraryComponent},
    {path: 'book/:bookId', component: BookComponent },
    {path: 'search', component: SearchComponent },
    {path: '', redirectTo: 'library', pathMatch: 'full'}];