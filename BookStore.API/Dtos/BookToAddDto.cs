using System;
using System.Collections.Generic;
using BookStore.API.Models;

namespace BookStore.API.Dtos
{
    public class BookToAddDto
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
        
    }
}