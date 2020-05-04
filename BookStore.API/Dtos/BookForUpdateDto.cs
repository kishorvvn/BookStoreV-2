using System;

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
    }
}