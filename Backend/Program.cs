using Microsoft.EntityFrameworkCore;
using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using System.ComponentModel.DataAnnotations;

namespace Product_Management_System_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<ProductDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("ProductManagementSystemDb")));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ProductDTOValidator>());


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseExceptionHandler(exceptionHandlerApp
                => exceptionHandlerApp.Run(async context
                    => await Results.Problem()
                                 .ExecuteAsync(context)));

            app.UseStaticFiles(); 
            app.UseCors("MyPolicy");
            app.UseRouting();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Product Management System API V1");
                c.RoutePrefix = string.Empty;
            });

            var products = app.MapGroup("/products");

            products.MapGet("/", async (ProductDbContext db) =>
                await db.Products.ToListAsync());


            products.MapGet("/{id}", async (int id, ProductDbContext db) => {
                return await db.Products.FindAsync(id)
                    is Product product
                        ? Results.Ok(product)
                        : Results.NotFound();
            });

            products.MapPost("/", async (ProductDTO request, ProductDbContext db, IValidator<ProductDTO> validator) =>
            {
                var validationResult = await validator.ValidateAsync(request);

                if (!validationResult.IsValid)
                {
                    return Results.ValidationProblem(validationResult.ToDictionary());
                }
                var product = new Product(request.Name, request.Description, request.Price, DateTime.Now);
                db.Products.Add(product);
                await db.SaveChangesAsync();

                return Results.Created($"/products/{product.Id}", product);
            });

            products.MapPut("/{id}", async (int id, ProductDTO inputProduct, ProductDbContext db) =>
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


    public static class ValidationResultExtensions
    {
        public static IDictionary<string, string[]> ToDictionary(this FluentValidation.Results.ValidationResult result)
        {
            return result.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray());
        }
    }

}
