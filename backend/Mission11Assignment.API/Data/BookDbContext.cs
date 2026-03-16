using Microsoft.EntityFrameworkCore;

namespace Mission11Assignment.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
        
    }
    
    // Setting up the table name so it knows where to go look in the database
    public DbSet<Book> Books { get; set; }
}