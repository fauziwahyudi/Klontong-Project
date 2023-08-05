**How to Run the Program and Perform Testing Flow**

Below are simple steps to run the program and perform testing on this application:

**1. Installation**

- Make sure you have the latest Node.js installed on your computer. If not, download it from https://nodejs.org and follow the installation guide.

**2. Clone the Repository**

- Open your terminal or command prompt.
- Change the directory to the desired location where you want to clone the repository.
- Run the following command to clone the repository:
- Download or clone this repository to your computer.
example: 

```
git clone https://github.com/fauziwahyudi/Klontong-Project.git
```

**3. Database Preparation**

- Ensure you have a database (e.g., MySQL or PostgreSQL) installed and running on your computer.
- Create a new database for this application (e.g., "klontongdb") or your terminal run -- npx sequelize db:create -- after you fill DATABASE CONFIGURATION (step 3).

**3. Database Configuration**

- In folder "Klontong-Project" navigate to the project's directory 
  
  ```
  cd server-side
  ```

- open the file `config/config.json`.
- Fill in your database credentials, such as host, username, password, and the database name you created earlier.
example: 
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "klontong_project",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "klontong_project_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}

**4. Install Dependencies**

- Run in your terminal the following command to install the required dependencies:

```
npm install
```

**5. Running Migrations and Seeders**

- After the dependencies are installed, run migrations to create the necessary tables in the database and run seeder to seed your database:

```
npx sequelize db:migrate
```
```
npx sequelize db:seed:all
```

**6. Set Up Environment Variables**

- Create a new file named .env in the root directory of the project (in folder server).
- Open the .env file.
- Add the following configurations to the .env file:
  
```
SECRET_KEY=secret
IMAGEKIT_PUBLIC_KEY="public_uHp4Ow3gmk5F0SbkibBbzweMx2c="
IMAGEKIT_PRIVATE_KEY="private_yxjdFwrWXT4avaA+EwngOPXEmIM="
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/egkozry2v"
```

**7. Running the Application**

- Once migrations are completed, run the following command to start the application:

```
nodemon server
```

**8. Testing Flow**

*Using Superjest to Testing the API*

- The application is equipped with several testing flows to ensure basic functions work correctly.
- Before run testing, run create database and migrations testing to create the necessary tables in the database and run seeder to seed your database:
  
```
npx sequelize --env test db:create
```
```
npx sequelize --env test db:migrate
```

- Run the following command to start the testing:

```
npm run test
```

- The test results will be displayed in the terminal or command prompt.
- Ensure all tests pass successfully before proceeding.

*Using Postman to Test the API*

To use Postman to test the API, make sure that the server application is running correctly as per the previous steps. Also, ensure that you have Postman installed on your computer before proceeding. Open your postman and access `http://localhost:3004` (adjust the port as needed) to access the application.

# Example test using the "POST /login" method:

- Open Postman and ensure that the server application is running at http://localhost:3004.
- Select the "POST" method.
- Enter the endpoint URL: http://localhost:3004/login.
- In the "Body" tab, select "x-www-form-urlencoded".
- Add two key-value pairs for the email and password:
  ex:

        Key: email, Value: admin@gmail.com
        Key: password, Value: 12345

- Click the "Send" button to submit the login request.
- The server will process the request and, if the credentials are correct, will respond with an access token in the response.

Example response from the server:

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyNzQyNzR9.ldgutox6c1CffeEXx0k0Peuwkg5EEOMI_rhuuhu6Lns",
    "username": "admin"
}


# Example test using the "GET /products" method:

- Open Postman and ensure that the server application is running at http://localhost:3004.
- Select the "GET" method.
- Enter the endpoint URL: http://localhost:3004/products.
- Click on the "Headers" tab.
- Add a new key-value pair in the headers:
  ex:

        Key: access_token
        Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyNzQyNzR9.ldgutox6c1CffeEXx0k0Peuwkg5EEOMI_rhuuhu6Lns

- Click the "Send" button to submit the request.

# Example test using the "POST /products" method add product:

- Open Postman and ensure that the server application is running at http://localhost:3004.
- Select the "POST" method.
- Enter the endpoint URL: http://localhost:3004/products.
- Click on the "Headers" tab.
- Add a new key-value pair in the headers:
  ex:

        Key: access_token
        Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyNzQyNzR9.ldgutox6c1CffeEXx0k0Peuwkg5EEOMI_rhuuhu6Lns

- In the "Body" tab, select "form-data" because there is items upload.
- Add two key-value pairs for the email and password:
  ex:

        Key: categoryId, Value: 1
        Key: categoryName", Value: Snacks
        Key: sku, Value: SKUITMZXY
        Key: name, Value: Potato Chips
        Key: description, Value: Crispy and delicious potato chips for snacking
        Key: weight, Value: 50
        Key: width, Value: 15
        Key: length, Value: 20
        Key: height, Value: 5
        Key: image, Value: note: select File and upload your image
        Key: price, Value: 10000 

- Click the "Send" button to submit the request.

# Example test using the "POST /products/:id" method edit product:

- Open Postman and ensure that the server application is running at http://localhost:3004.
- Select the "POST" method.
- Select the ID you want to edit.
- Enter the endpoint URL: http://localhost:3004/products/1.
- Click on the "Headers" tab.
- Add a new key-value pair in the headers:
  ex:

        Key: access_token
        Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyNzQyNzR9.ldgutox6c1CffeEXx0k0Peuwkg5EEOMI_rhuuhu6Lns
        
- In the "Body" tab, select "form-data" because there is items upload.
- Add two key-value pairs for the email and password:
  ex:

        Key: categoryId, Value: 1
        Key: categoryName", Value: Snacks
        Key: sku, Value: SKUSV6HVM
        Key: name, Value: Good Time Cookies Double Chocolate
        Key: description, Value: Mouthwatering chocolate cookies to satisfy your sweet cravings.
        Key: weight, Value: 50
        Key: width, Value: 15
        Key: length, Value: 20
        Key: height, Value: 5
        Key: image, Value: note: select File and upload your image
        Key: price, Value: 15000

- Click the "Send" button to submit the request.

# Example test using the "DELETE /products/:id" method:

- Open Postman and ensure that the server application is running at http://localhost:3004.
- Select the "DELETE" method.
- Select the ID you want to delete.
- Enter the endpoint URL: http://localhost:3004/products/1.
- Click on the "Headers" tab.
- Add a new key-value pair in the headers:
  ex:

        Key: access_token
        Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyNzQyNzR9.ldgutox6c1CffeEXx0k0Peuwkg5EEOMI_rhuuhu6Lns

- Click the "Send" button to submit the request.

# Example test using the "GET /products/:id" detail product method:

- Open Postman and ensure that the server application is running at http://localhost:3004.
- Select the "GET" method.
- Select the ID you want to detail product.
- Enter the endpoint URL: http://localhost:3004/products/1.
- Click on the "Headers" tab.
- Add a new key-value pair in the headers:
  ex:

        Key: access_token
        Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEyNzQyNzR9.ldgutox6c1CffeEXx0k0Peuwkg5EEOMI_rhuuhu6Lns

- Click the "Send" button to submit the request.
  
  
**User for Testing Admin**

- In folder "Klontong-Project" navigate to the project's directory 
  
  ```
  cd admin-side
  ```
- Run the following command to start the application:

```
npx vite
```

- Before login, make sure that the server application is running. Use the following credentials to login as a regular user and perform testing according to the defined testing flow.

```
Email: admin@gmail.com
Password: 12345
```

**Important Note:**

- If you encounter any difficulties in running the application or testing, feel free to contact our support team via email fauziwahyudi12@gmail.com or phone 085172236142.
- We are committed to providing you with an easy and enjoyable shopping experience. Thank you for choosing Klontong Mart as your online shopping destination!