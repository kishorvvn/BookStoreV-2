import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book: Book;


  constructor(private bookService: BookService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBook();
  }

  loadBook(){
    this.bookService.getBook(+this.route.snapshot.params['id']).subscribe((book: Book) => {
      this.book = book;
    }, error => {
      this.alertify.error(error);
    });
  }

}
