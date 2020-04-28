using System.Collections.Generic;
using System.Threading.Tasks;
using BookStore.API.Models;

namespace BookStore.API.Data
{
    public interface IBookRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBook(int id);
    }
}