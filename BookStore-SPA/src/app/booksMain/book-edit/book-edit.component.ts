import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  // to reset the edit form after hitting save button
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  book: Book;
  // -----------------------------------------------------
 
  // to warn the user if they close the browser during editing book
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private bookService: BookService, private alertify: AlertifyService,
              private route: ActivatedRoute, private authSevice: AuthService) {
               }

  ngOnInit() {
    this.loadBook();
    // this.route.data.subscribe(data => {
    //   this.book = data['book'];
    // })
  }

  loadBook(){
    this.bookService.getBook(+this.route.snapshot.params['id']).subscribe((book: Book) => {
      this.book = book;
    }, error => {
      this.alertify.error(error);
    });
  }

  updateBook(){
    this.bookService.updateBook(+this.route.snapshot.params['id'], this.book).subscribe(next => {
      this.alertify.success('Book detail updated successfully');
      // to reset the edit form after hiting save button
      this.editForm.reset(this.book);
    }, error => {
      this.alertify.error(error);
    });
  }

  // -----------------------------------------------------

  }

