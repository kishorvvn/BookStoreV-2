using System;

namespace BookStore.API.Dtos
{
    public class BookForListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public string CategoryName { get; set; }
        public double Rating { get; set; }
        
    }
}