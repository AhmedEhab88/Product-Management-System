# Product Management System
- This is a simple Product Management System built using :
  - Angular 19
  - .NET 8 Minimal APIs 
  - SQL Server
- This system supports the following:
  - Retrieving products from the backend and displaying it in a table using PrimeNG datatable.
  - Editing a specific product.
  - Creating a new product.
  - Deleting a product.
  - Sorting the product table by any of the available columns.
  - Searching/Filtering the table by product name.

 ### Setup
 - To set this project up, please make sure you have installed:
     - Node v20
     - Angular v19.
     - .NET 8 (check which version you have installed by running `dotnet --version`.)
     - SQL Server Server 2019 or higher.
     - Visual Studio 2022
#### Frontend setup
- Download the frontend folder, navigate to your folder's location and run `npm install`.
#### Backend & Database setup
- To set up the database,
    - First make sure the connection string in the `appsettings.json` file correctly points to your local SQL Server instance.
    - Open up the solution in Visual Studio 2022, then in the `Package Manager Console`, run `update-database`, this should set up a `Product-Management-System` database with an empty `Products` table.
- Restore any nuget packages by running `dotnet restore`, also running it in the `Package Manager Console` .

### Running the application
- Navigate to the backend's project folder and run `dotnet run`.
- Navigate to the frontend's project folder and run `npm start` in the terminal. This should start up the frontend application at `http://localhost:4200`. Visit that link to verify your app is running.
- The products list will first be empty, proceed by creating a new product by clicking on the `Create New Product` button and then fill + submit the form.
- This should navigate you back the main page, showing the product you have just created.

### Some Notes
- With regards to the backend application, you may notice the lack of solution architecture design, for example, I did not implement Vertical Slice or Clean or N-tier architecure. The main reason being: simplicity. I found that the minimal API is very simple, it only has one table, one model class, and only a few endpoints, therefore, going for such architectures for an application this simple would be considered "over-enginnering". However, if the initial plan was that the application is any larger with more entities, then it would've definitely been built using such designs. 
