using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BookStore.API.Data;
using BookStore.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _repo;
        private readonly IMapper _mapper;
        public BooksController(IBookRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        //method to return books 
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _repo.GetBooks();
            var booksToReturn = _mapper.Map<IEnumerable<BookForListDto>>(books);
            
            return Ok(booksToReturn);
        }
        //method to return book of particular id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _repo.GetBook(id);
            var bookToReturn = _mapper.Map<BookForDetailedDto>(book);
           
            return Ok(bookToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, BookForUpdateDto bookForUpdateDto)
        {
            var bookFromRepo = await _repo.GetBook(id);

            if (bookFromRepo == null)
                return BadRequest($"Book with id {id} does not exist.");
            _mapper.Map(bookForUpdateDto, bookFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating book detail for book id {id} failed on save.");
        }

    }
}