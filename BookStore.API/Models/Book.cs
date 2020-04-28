using System;
using System.Collections.Generic;

namespace BookStore.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishedDate { get; set; }
        public string ISBN { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}