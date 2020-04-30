import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Book } from '../_models/book';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { BookService } from '../_services/book.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BookEditResolver implements Resolve<Book>{
    constructor(private bookService: BookService, private authService: AuthService,
                private router: Router, private alertify: AlertifyService) {}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
        // const id = route.params.get['id'];
        // return this.bookService.getBook('book/' + id);

        return this.bookService.getBook(+route.params['id'])
        // this is how id of an book from route is retrived
        // ActivatedRouteSnapshot does not have .snapshot property as in case of book-detail.component.ts
        .pipe(
            catchError(error => {
                this.alertify.error('Problem retriving book detail');
                this.router.navigate(['/books']);
                return of(null);
            })
        );
    }
}
