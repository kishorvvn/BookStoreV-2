import { Review } from './review';

export interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: Date;
    isbn: string;
    photoUrl: string;
    price: number;
    categoryName: string;
    reviews: Review[];
    rating: number;
    avegRating: number;
}
