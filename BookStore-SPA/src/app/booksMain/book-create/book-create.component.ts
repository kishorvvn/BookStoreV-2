import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  book: Book;
  addNewBook: FormGroup;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.addNewBook = new FormGroup({
      title: new FormControl(),
      author: new FormControl(),
      publishedDate: new FormControl(),
      iSBN: new FormControl(),
      price: new FormControl(),
      categoryId: new FormControl(),
    });
  }

  addBook(){
    this.book = Object.assign({}, this.addNewBook.value);
    this.bookService.addBook(this.book).subscribe(() => {
      console.log('Book added successfully');
    }, error => {
      console.log('Failed');
    });
  }

}
