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
  cd Server
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

- Create a new file named .env in the root directory of the project.
- Open the .env file.
- Add the following configurations to the .env file:

SECRET_KEY=secret
IMAGEKIT_PUBLIC_KEY="public_uHp4Ow3gmk5F0SbkibBbzweMx2c="
IMAGEKIT_PRIVATE_KEY="private_yxjdFwrWXT4avaA+EwngOPXEmIM="
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/egkozry2v"


**6. Running the Application**

- Once migrations are completed, run the following command to start the application:

```
nodemon server
```

- The application will run on the specified port (e.g., port 3004). Open your browser and access `http://localhost:3004` (adjust the port as needed) to access the application.



**7. Testing Flow**

- The application is equipped with several testing flows to ensure basic functions work correctly.
- To run the testing, ensure the application is running (execute `npm start` first).
- Run the following command to start the testing:

```
npm run test
```

- The test results will be displayed in the terminal or command prompt.
- Ensure all tests pass successfully before proceeding.

**User for Testing**

- Use the following credentials to log in as a regular user and perform testing according to the defined testing flow.
- Email: admin@gmail.com
- Password: 12345

**Important Note:**

- If you encounter any difficulties in running the application or testing, feel free to contact our support team via email fauziwahyudi12@gmail.com or phone 085172236142.
- We are committed to providing you with an easy and enjoyable shopping experience. Thank you for choosing Klontong Mart as your online shopping destination!