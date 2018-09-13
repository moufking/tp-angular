import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {GoogleBooksService} from '../shared/google-books.service';
import {Router} from '@angular/router';





@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {



  @Input()
  private page: number=1 ;
  @Input()
  private totalPages: number=0;

@Output()
  private changePage: EventEmitter<number> = new EventEmitter<number>();
  constructor( public books: GoogleBooksService,private router: Router){ }
  next() {
    if(this.books.page>=this.books.totalPages){
      return ;
    }
    this.books.page +=1;
    //console.log(this.books.page);
    this.books.searchBooks(this.books.query);
    this.router.navigate(['search', {term :this.books.query,page :this.books.page}]);

  }
 
  prev() {
    if(this.books.page<2){
      return;
    } 
    this.books.page -=1;
    //console.log(this.books.page);
    
    this.books.searchBooks(this.books.query);
    this.router.navigate(['search', {page :this.books.page}]);
    this.router.navigate(['search', {term :this.books.query,page :this.books.page}]);


  }
  


  ngOnInit() {
  }

}
