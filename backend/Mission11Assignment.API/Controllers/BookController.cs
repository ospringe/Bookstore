using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Assignment.API.Data;

namespace Mission11Assignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var query = _bookContext.Books.AsQueryable();

            if (sortOrder == "asc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else
            {
                query = query.OrderByDescending(b => b.Title);
            }
            
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();
            
            var someObject = (new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            });

            return Ok(someObject);
        }
    }
}
