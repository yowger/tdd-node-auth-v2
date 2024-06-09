import request from "supertest"
import app from "@src/app"

describe("auth routes", () => {
    describe("POST api/register", () => {
        it("should register a user successfully", async () => {
            const userPayload = {
                email: "johndoe@gmail.com",
                password: "password123",
            }

            const { body, statusCode } = await request(app)
                .post("/api/register")
                .send(userPayload)

            expect(body).toHaveProperty("id")
            expect(statusCode).toBe(201)
        })

        it("should return 400 when email is missing", async () => {
            const userPayload = {
                password: "password123",
            }

            const { body, statusCode } = await request(app)
                .post("/api/register")
                .send(userPayload)

            expect(statusCode).toBe(400)
            expect(body).toHaveProperty("error", "Email is required")
        })
    })
})
