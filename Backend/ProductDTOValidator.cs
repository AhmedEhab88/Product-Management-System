using FluentValidation;

namespace Product_Management_System_API
{
    public class ProductDTOValidator : AbstractValidator<ProductDTO>
    {
        public ProductDTOValidator() 
        {
            RuleFor(product => product.Name)
                    .NotEmpty()
                    .WithMessage("Name is required.")
                    .Length(2, 100)
                    .WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(product => product.Description)
                .NotEmpty()
                .WithMessage("Description is required.");

            RuleFor(product => product.Price)
                .GreaterThan(0)
                .WithMessage("Price must be greater than 0.");
        }
    }
}
