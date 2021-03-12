import request from "supertest";
import { app } from "../app";

import createConnection from '../database'

describe("General Tests", () => {  
    
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
//users
    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example"
        });
        expect(response.status).toBe(201);
    });

    it("Shouldn't be able to create an user with existent email", async () => {
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example"
        });
        expect(response.status).toBe(400);
    });
//surveys
    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys")
        .send({
            title: "Title example",
            description: "Description example"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });   

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys")
        .send({
            title: "Title example 2",
            description: "Description example 2"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
    
});