using System.Collections.Generic;
using System.Threading.Tasks;
using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _context;
        public BookRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Book> GetBook(int id)
        {
            var book = await _context.Books.Include(a => a.Category)
                .Include(b => b.Reviews).FirstOrDefaultAsync(c => c.Id == id);
            
            return book;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var books = await _context.Books.Include( d => d.Category).Include(e => e.Reviews).ToListAsync();

            return books;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
            // > 0 is used to return true or false. if return value is > 0 it returns true else false.
        }
    }
}