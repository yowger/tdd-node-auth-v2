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
    password: "Password123",
}

const registerUser = (user = validUser) => {
    return request(app).post("/api/register").send(user)
}

describe("auth routes", () => {
    describe("POST api/register", () => {
        it("should return 201 if register is success", async () => {
            const { statusCode } = await registerUser()

            expect(statusCode).toBe(201)
        })

        it("should return 400 when name, email or password is missing", async () => {
            const invalidUsers = [
                {
                    name: "",
                    email: "johndoe12@gmail.com",
                    password: "Password123",
                },
                {
                    name: "John Doe",
                    email: "",
                    password: "Password123",
                },
                {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "",
                },
            ]

            for (const invalidUser of invalidUsers) {
                const { statusCode } = await registerUser(invalidUser)

                expect(statusCode).toBe(400)
            }
        })

        it("should return 400 when email has invalid format", async () => {
            const invalidEmailUsers = [
                {
                    name: "John Doe",
                    email: "Abc.example.com",
                    password: "Password123",
                },
                {
                    name: "John Doe",
                    email: "A@b@c@example.com",
                    password: "Password123",
                },
            ]

            for (const invalidEmailUser of invalidEmailUsers) {
                const { statusCode } = await registerUser(invalidEmailUser)

                expect(statusCode).toBe(400)
            }
        })

        describe("invalid Passwords", () => {
            it("should return 400 when password is less than 6 characters", async () => {
                const userInput = {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "weak",
                }
                const { statusCode } = await registerUser(userInput)
                expect(statusCode).toBe(400)
            })

            it("should return 400 when password has no uppercase letter", async () => {
                const userInput = {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "alllowercase",
                }
                const { statusCode } = await registerUser(userInput)
                expect(statusCode).toBe(400)
            })

            it("should return 400 when password has no lowercase letter or number", async () => {
                const userInput = {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "ALLUPPERCASE",
                }
                const { statusCode } = await registerUser(userInput)
                expect(statusCode).toBe(400)
            })

            it("should return 400 when password has no uppercase letter", async () => {
                const userInput = {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "123456",
                }
                const { statusCode } = await registerUser(userInput)
                expect(statusCode).toBe(400)
            })

            it("should return 400 when password is less than 6 characters", async () => {
                const userInput = {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "Abc1",
                }
                const { statusCode } = await registerUser(userInput)
                expect(statusCode).toBe(400)
            })

            it("should return 400 when password has no number", async () => {
                const userInput = {
                    name: "John Doe",
                    email: "johndoe12@gmail.com",
                    password: "NoNumber",
                }
                const { statusCode } = await registerUser(userInput)
                expect(statusCode).toBe(400)
            })
        })
    })
})
