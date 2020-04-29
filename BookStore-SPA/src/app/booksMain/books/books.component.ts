import { Component, OnInit } from '@angular/core';
import { Book } from '../../_models/book';
import { AlertifyService } from '../../_services/alertify.service';
import { BookService } from '../../_services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    }, error => {
      this.alertify.error(error);
    })
  }
}
