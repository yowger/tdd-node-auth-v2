import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body
    if (!email) {
        return res.status(400).send({ error: "Email is required" })
    }

    const user = { id: 1, username, email }
    res.status(201).send(user)
})

export default app
