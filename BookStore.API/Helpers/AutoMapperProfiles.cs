using AutoMapper;
using BookStore.API.Dtos;
using BookStore.API.Models;

namespace BookStore.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //maps property from source to the destination. Eg- Book to BoosForListDto
            CreateMap<Book, BookForListDto>()
            .ForMember(dest => dest.CategoryName, opt =>
                opt.MapFrom(src => src.Category.CategoryName))
                .ForMember(dest => dest.Rating, opt =>
                opt.MapFrom(src => src.Reviews.CalculateRating()));
                //mapped categoryName from source Category to destination BookForListDto
                //mapped rating to average rating from total reviews. Method is in extension class
            CreateMap<Book, BookForDetailedDto>()
             .ForMember(dest => dest.CategoryName, opt =>
                opt.MapFrom(src => src.Category.CategoryName))
                .ForMember(dest => dest.AvegRating, opt =>
                opt.MapFrom(src => src.Reviews.CalculateRating()))
                .ForMember(dest => dest.Reviews, opt =>
                opt.MapFrom(src => src.Reviews))
               .ForMember(dest => dest.ISBN, opt =>
                opt.MapFrom(src => src.ISBN));
                
            CreateMap<Review, ReviewForDetailedDto>();
        }
    }
}