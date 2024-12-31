namespace Product_Management_System_API
{
    public class Product
    {
        public Product(string? name, string? description, decimal price, DateTime createdDate)
        {
            Name = name;
            Description = description;
            Price = price;
            CreatedDate = createdDate;
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
