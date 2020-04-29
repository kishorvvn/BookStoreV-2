using System.Collections.Generic;
using System.Linq;
using BookStore.API.Dtos;
using BookStore.API.Models;
using Microsoft.AspNetCore.Http;

namespace BookStore.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        //Calculate Average rating for the book
        public static double CalculateRating(this ICollection<Review> reviews)
        {
            var totalReviews = reviews.Count;
            double avegRating = 0;
            double total = 0;
            if(totalReviews == 0){
                return avegRating; 
            }
            else
            {
            var rating1 = reviews.Where(b => b.Rating == 1).Count();
            var rating5 = reviews.Where(b => b.Rating == 5).Count();
            var rating4 = reviews.Where(b => b.Rating == 4).Count();
            var rating3 = reviews.Where(b => b.Rating == 3).Count();
            var rating2 = reviews.Where(b => b.Rating == 2).Count();

            total = ((rating1 * 1) + (rating2 * 2) + (rating3 * 3) + (rating4 * 4) + (rating5 * 5));

            }
            avegRating = total / totalReviews;
            
            return avegRating;
        }
    }
}