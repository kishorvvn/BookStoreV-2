using System;
using Microsoft.AspNetCore.Http;

namespace BookStore.API.Dtos
{
    public class BookForUpdateDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Isbn { get; set; }
        public double Price { get; set; }
        public string CategoryName { get; set; }
        public string  PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public IFormFile File { get; set; }
    }
}