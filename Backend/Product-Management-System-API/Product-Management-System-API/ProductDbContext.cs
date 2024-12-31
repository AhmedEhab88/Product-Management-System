using Microsoft.EntityFrameworkCore;

namespace Product_Management_System_API
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options)
        : base(options) { }

        public DbSet<Product> Products => Set<Product>();
    }
}
