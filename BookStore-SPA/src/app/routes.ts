import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    // use canActivate controll to protect unauthorized users
    {
        path: '', // http://localhost:5000/
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], // guard we created
        // all other routes
        children: [
            { path: 'books', component: BooksComponent},
            { path: 'category', component: CategoryComponent},
        ]
    },
        { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
