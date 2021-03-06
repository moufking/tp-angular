import {Component, OnInit} from '@angular/core';
import {GoogleBooksService} from '../shared/google-books.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {

  term = '';

  constructor( private router: Router, public route: ActivatedRoute,
               public googleBooksService: GoogleBooksService ) {
      const options = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const jsonResponse = new Response('{}', options);

      console.log(jsonResponse);
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
    this.router.navigate(['search', { term : this.term ,page :this.googleBooksService.page}]);
    console.log(this.term);
  }


  onSearch (term: string) {
    this.googleBooksService.searchBooks(term);


  }

  ngOnInit() {
  }

}
