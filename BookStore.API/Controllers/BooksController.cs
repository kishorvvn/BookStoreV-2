using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BookStore.API.Data;
using BookStore.API.Dtos;
using BookStore.API.Helpers;
using BookStore.API.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BookStore.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public BooksController(IBookRepository repo, IMapper mapper,
       
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            
            _cloudinary = new Cloudinary(acc);
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
       
// map bookForUpdateDto to bookFromRepo
        _mapper.Map(bookForUpdateDto, bookFromRepo);

        if (await _repo.SaveAll())
            return NoContent();

        throw new Exception($"Updating book detail for book id {id} failed on save.");
    }

    

    [HttpPost("{id}")]
    public async Task<IActionResult> AddPhotoForBook(int id, [FromForm]BookForUpdateDto bookForUpdateDto)
    {
        var bookFromRepo = await _repo.GetBook(id);

        if (bookFromRepo == null)
            return BadRequest($"Book with id {id} does not exist.");
            // -----------------------------------------------------------------

        var file = bookForUpdateDto.File;

        var uploadResult = new ImageUploadResult();

        if(file == null){
            bookForUpdateDto.PhotoUrl = bookFromRepo.PhotoUrl;
            bookForUpdateDto.PublicId = bookFromRepo.PublicID;
        }
        else if(file.Length > 0)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.Name, stream),
                    // Transformation = new Transformation().Width(0.5).Height(0.5)
                };

                uploadResult = _cloudinary.Upload(uploadParams);
            }
            bookForUpdateDto.PhotoUrl = uploadResult.Uri.ToString();
            bookForUpdateDto.PublicId = uploadResult.PublicId;
            bookForUpdateDto.Title = bookFromRepo.Title;
            bookForUpdateDto.Author = bookFromRepo.Author;
            bookForUpdateDto.PublishedDate = bookFromRepo.PublishedDate;
            bookForUpdateDto.Isbn = bookFromRepo.ISBN;
            bookForUpdateDto.Price = bookFromRepo.Price;
            bookForUpdateDto.CategoryName = bookFromRepo.Category.CategoryName;
        }
// ---------------------------------------------------------------------
// map bookForUpdateDto to bookFromRepo
        _mapper.Map(bookForUpdateDto, bookFromRepo);

        if (await _repo.SaveAll())
            return NoContent();

        throw new Exception($"Updating book detail for book id {id} failed on save.");
    }


    
    [HttpPost("addBook")]
        public async Task<IActionResult> AddBook([FromForm]BookToAddDto bookToAddDto)
        { 
            var bookToCreate = _mapper.Map<Book>(bookToAddDto);
    //     var bookToCreate = new Book{

    //       Title = book.Title,
    //       Author = book.Author,
    //       PublishedDate = book.PublishedDate,
    //       ISBN = book.ISBN,
    //       Price = book.Price,
    //       PhotoUrl = book.PhotoUrl,
    //       CategoryId = book.CategoryId
    // };

    var createdBook = await _repo.AddBook(bookToCreate);
    return StatusCode(201);
}

}
}