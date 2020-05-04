import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';

// create header to get token from user to authenticate user
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

// returns books through http request
getBooks(): Observable<Book[]> {
return this.http.get<Book[]>(this.baseUrl + 'books', httpOptions);
// httpOptions is added to sent token with query
}

// returns book through http request
getBook(id): Observable<Book> {
return this.http.get<Book>(this.baseUrl + 'books/' + id, httpOptions);
}

updateBook(id: number, book: Book){
  return this.http.put(this.baseUrl + 'books/' + id, book);
}
}
