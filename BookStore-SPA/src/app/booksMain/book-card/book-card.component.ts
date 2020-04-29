import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  // to pass user from parent to child component
  @Input() book: Book;
 
  constructor() { }

  ngOnInit() {
  }

}
