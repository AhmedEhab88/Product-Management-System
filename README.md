# Product Management System
- This is a simple CRUD product management system built using Angular 19 for the frontend, .NET 8 Minimal APIs for the backend, and SQL Server as the database.
- This system supports the following:
  - Retrieving products from the backend and displaying it in a table using PrimeNG datatable.
  - Editing a specific product.
  - Creating a new product.
  - Deleting a product.
  - Sorting the product tables by all columns.
  - Searching/Filtering by product name on the main page.

 ### Setup
 - To set this project up, please make sure you have installed:
     - Node v20
     - Angular v19.
     - .NET 8 (check which version you have installed by running `dotnet --version`.)
     - SQL Server
     - Visual Studio 2022
#### Frontend setup
- Download the frontend folder and run `npm install`
#### Backend & Database setup
- To set up the database,
    - First make sure the connection string in the `appsettings.json` file correctly points to your local SQL Server instance.
    - Open up the solution in Visual Studio 2022, then in the `Package Manager Console`, run `update-database`, this should set up a `Product-Management-System` database with an empty `Products` table.
- Restore any nuget packages by running `dotnet restore`, also in the `Package Manager Console` .

### Running the application
- Navigate to the backend's project folder and run `dotnet run`.
- Navigate to the frontend's project folder and run `npm start` in the terminal. This should start up the frontend application at `http://localhost:4200`. Visit that link to verify your app is running.
- The products list will first be empty, proceed by creating a new product by clicking on the `Create New Product` button and then fill + submit the form.
- This should navigate you back the main page, showing the product you have just created.
