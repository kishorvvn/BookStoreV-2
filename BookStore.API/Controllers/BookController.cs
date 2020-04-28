using System.Threading.Tasks;
using BookStore.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repo;
        public BookController(IBookRepository repo)
        {
            _repo = repo;

        }
        //method to return books 
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _repo.GetBooks();
            return Ok(books);
        }
        //method to return book of particular id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _repo.GetBook(id);

            return Ok(book);
        }

    }
}