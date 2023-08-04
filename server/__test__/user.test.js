const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");

let access_token;

beforeAll(async () => {

    const categories = require(`../data/categories.json`);
    categories.forEach((el) => {
        el.updatedAt = el.createdAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert(`Categories`, categories, {});

    const users = require(`../data/users.json`);
    users.forEach((el) => {
        el.updatedAt = el.createdAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert(`Users`, users, {});

    const products = require(`../data/products.json`);
    products.forEach((el) => {
        el.updatedAt = el.createdAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert(`Products`, products, {});
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete(`Categories`, null, {
        cascade: true,
        truncate: true,
        restartIdentity: true,
    });

    await sequelize.queryInterface.bulkDelete(`Users`, null, {
        cascade: true,
        truncate: true,
        restartIdentity: true,
    });

    await sequelize.queryInterface.bulkDelete(`Products`, null, {
        cascade: true,
        truncate: true,
        restartIdentity: true,
    });
});

describe("api testing", () => {
    // REGISTER
    describe("POST /register", () => {
        test("should create customer account and response 201", async () => {
            const user = {
                username: "test",
                email: "test@gmail.com",
                password: "12345",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };

            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message", "user with id 2 and email test@gmail.com has been created");
            expect(response.body.message).toContain("user with id 2 and email test@gmail.com has been created");
        });

        test("should response 400 bad request Email is required", async () => {
            const user = {
                username: "test",
                password: "12345",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };
            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Email is required");
            expect(response.body.message).toContain("Email is required");
        });

        test("should response 400 bad request Password is required", async () => {
            const user = {
                username: "test",
                email: "test@gmail.com",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };

            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Password is required");
            expect(response.body.message).toContain("Password is required");
        });

        test("should response 400 bad request Email can't be empty", async () => {
            const user = {
                username: "test",
                email: "",
                password: "12345",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };

            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Email can't be empty");
            expect(response.body.message).toContain("Email can't be empty");
        });

        test("should response 400 bad request Password can't be empty", async () => {
            const user = {
                username: "test",
                email: "test@gmail.com",
                password: "",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };

            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Password can't be empty");
            expect(response.body.message).toContain("Password can't be empty");
        });

        test("should response 400 bad request Email must be unique", async () => {
            const user = {
                username: "test",
                email: "test@gmail.com",
                password: "12345",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };

            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Email must be unique");
            expect(response.body.message).toContain("Email must be unique");
        });

        test("should response bad 400 request Invalid email format", async () => {
            const user = {
                username: "test",
                email: "testgmail.com",
                password: "12345",
                phoneNumber: "085267488727",
                address: "Jl. Veteran No 18"
            };

            const response = await request(app).post("/register").send(user);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Invalid email format");
            expect(response.body.message).toContain("Invalid email format");
        });
    });
});