import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './booksMain/books/books.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './_guards/auth.guard';
import { BookDetailComponent } from './booksMain/book-detail/book-detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    // use canActivate controll to protect unauthorized users
    {
        path: '', // http://localhost:4200/
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], // guard we created
        // all other routes
        children: [
            { path: 'books', component: BooksComponent},
            { path: 'books/:id', component: BookDetailComponent},
            { path: 'category', component: CategoryComponent},
        ]
    },
        { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
