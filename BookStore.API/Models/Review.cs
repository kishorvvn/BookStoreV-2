namespace BookStore.API.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Comments { get; set; }
        public double Rating { get; set; }
        public Book Book { get; set; }
        public int BookId { get; set; }

    }
}