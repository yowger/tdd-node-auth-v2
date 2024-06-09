import request from "supertest"

import app from "@src/app"

import {
    clearDatabase,
    setupTestEnvironment,
    teardownTestEnvironment,
} from "../database"

jest.setTimeout(60000)

beforeAll(async () => {
    await setupTestEnvironment()
})

afterAll(async () => {
    await teardownTestEnvironment()
})

afterEach(async () => {
    await clearDatabase()
})

const validUser = {
    name: "John Doe",
    email: "johndoe12@gmail.com",
    password: "password123",
}

const registerUser = (user = validUser) => {
    return request(app).post("/api/register").send(user)
}

describe("auth routes", () => {
    describe("POST api/register", () => {
        it("should return 201 if register is success", async () => {
            const { statusCode } = await registerUser()

            expect(statusCode).toBe(201)
        }, 30000)

        // it("should return 400 when email is missing", async () => {

        // })
    })
})
