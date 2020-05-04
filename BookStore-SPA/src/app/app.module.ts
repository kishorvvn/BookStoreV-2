import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { JwtModule } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BooksComponent } from './booksMain/books/books.component';
import { CategoryComponent } from './category/category.component';
import { appRoutes } from './routes';
import { BookCardComponent } from './booksMain/book-card/book-card.component';
import { BookDetailComponent } from './booksMain/book-detail/book-detail.component';
import { BookEditComponent } from './booksMain/book-edit/book-edit.component';
import { BookEditResolver } from './_resolvers/book-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export function tokenGetter(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      BooksComponent,
      CategoryComponent,
      BookCardComponent,
      BookDetailComponent,
      BookEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      StarRatingModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      BookEditResolver,
      PreventUnsavedChanges // also add this to routes.ts as this is a route guard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
