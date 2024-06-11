import express from "express"

import { createUser, findUserByEmail } from "@src/services/userService"

import { registerSchema } from "@src/routes/auth/schema"

import validateRequest from "@src/middleware/validateRequest"

import type { Response, Request } from "express"
import bcrypt from "bcrypt"

const router = express.Router()

router.post(
    "/register",
    [validateRequest(registerSchema)],
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body

        const userExist = await findUserByEmail(req.body.email)
        if (userExist) {
            return res.status(409).json({ error: "Email already registered" })
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        const createdUser = await createUser({
            name,
            email,
            password: hashedPassword,
        })

        res.status(201).json(createdUser)
    }
)

export default router
