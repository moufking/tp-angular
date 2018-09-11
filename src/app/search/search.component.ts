import {Component, OnInit} from '@angular/core';
import {GoogleBooksService} from '../shared/google-books.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private term: string = '';
  const cacheAvailable = 'caches' in self;

  constructor( private router: Router, private route: ActivatedRoute,
               private googleBooksService: GoogleBooksService ) {
      caches.open('my-cache').then((cache) => {
          cache.add('kkkk');
         console.log(cache);
      });
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['term']) {

        //console.log(params['term']);
        this.term = params['term'];
        this.onSearch( this.term);
        this.term = ''; // empty this case
      }
    });
  }

  doSearch() {
    this.router.navigate(['search', { term : this.term }]);
  }


  onSearch (term: string) {
    this.googleBooksService.searchBooks(term);

  }

  ngOnInit() {
  }

}
