import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/register", (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).send({ error: "Email is required" })
    }

    const user = { id: 1, email }
    
    res.status(201).json(user)
})

export default app
