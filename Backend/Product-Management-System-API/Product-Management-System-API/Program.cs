using Microsoft.EntityFrameworkCore;

namespace Product_Management_System_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<ProductDbContext>(opt => opt.UseSqlServer("Server=.;Database=ProductManagementSystem;Trusted_Connection=True;TrustServerCertificate=True"));
            var app = builder.Build();

            var products = app.MapGroup("/products");

            products.MapGet("/", async (ProductDbContext db) =>
                await db.Products.ToListAsync());


            products.MapGet("/{id}", async (int id, ProductDbContext db) =>
                await db.Products.FindAsync(id)
                    is Product product
                        ? Results.Ok(product)
                        : Results.NotFound());

            products.MapPost("/", async (Product product, ProductDbContext db) =>
            {
                db.Products.Add(product);
                await db.SaveChangesAsync();

                return Results.Created($"/products/{product.Id}", product);
            });

            products.MapPut("/{id}", async (int id, Product inputProduct, ProductDbContext db) =>
            {
                var product = await db.Products.FindAsync(id);

                if (product is null) return Results.NotFound();

                product.Name = inputProduct.Name;
                product.Description = inputProduct.Description;
                product.Price = inputProduct.Price;

                await db.SaveChangesAsync();

                return Results.NoContent();
            });

            products.MapDelete("/{id}", async (int id, ProductDbContext db) =>
            {
                if (await db.Products.FindAsync(id) is Product product)
                {
                    db.Products.Remove(product);
                    await db.SaveChangesAsync();
                    return Results.NoContent();
                }

                return Results.NotFound();
            });

            app.Run();
        }
    }
}