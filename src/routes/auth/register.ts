import express from "express"

import { createUser } from "@src/services/userService"

import type { Response, Request } from "express"

const router = express.Router()

router.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    if (!email) {
        return res.status(400).send({ error: "Email is required" })
    }

    const createdUser = await createUser({
        name,
        email,
        password,
    })

    res.status(201).json(createdUser)
})

export default router
