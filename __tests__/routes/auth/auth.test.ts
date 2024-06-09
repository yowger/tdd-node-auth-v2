import request from "supertest"
import app from "../../../src/app"

describe("auth routes", () => {
    describe("POST api/register", () => {
        it("should register a user successfully", async () => {
            const userPayload = {
                username: "john doe",
                email: "johndoe@gmail.com",
                password: "password123",
            }

            const { statusCode, body } = await request(app)
                .post("/api/register")
                .send(userPayload)

            expect(statusCode).toEqual(201)
            expect(body).toHaveProperty("id")
        })
    })
})
