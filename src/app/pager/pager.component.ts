import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {GoogleBooksService} from '../shared/google-books.service'





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
  constructor( public books: GoogleBooksService){ }
  next() {
    if(this.books.page>=this.books.totalPages){
      return ;
    }
    this.books.page +=1;
    
    this.books.searchBooks(this.books.query);
  }

  prev() {
    if(this.books.page<2){
      return;
    } 
    this.books.page -=1;
    this.books.searchBooks(this.books.query);
  }


  ngOnInit() {
  }

}
