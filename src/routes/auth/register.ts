import express from "express"

import { createUser, findUserByEmail } from "@src/services/userService"

import { registerSchema } from "@src/routes/auth/schema"

import validateRequest from "@src/middleware/validateRequest"

import type { Response, Request } from "express"

const router = express.Router()

router.post(
    "/register",
    [validateRequest(registerSchema)],
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body

        const user = await findUserByEmail(req.body.email)
        if (user) {
            return res.status(409).json({ error: "Email already registered" })
        }

        const createdUser = await createUser({
            name,
            email,
            password,
        })

        res.status(201).json(createdUser)
    }
)

export default router
