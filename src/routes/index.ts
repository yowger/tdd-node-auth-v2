import express from "express"

import register from "@src/routes/auth/register"

const router = express.Router()

router.use("/", register)

export default router
