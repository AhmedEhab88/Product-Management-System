using System.ComponentModel.DataAnnotations;

namespace Product_Management_System_API
{
    public class ProductDTO
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
