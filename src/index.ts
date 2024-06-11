import "module-alias/register"

import connectDb from "@src/config/database"

import app from "@src/app"

const startServer = async () => {
    await connectDb()

    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

startServer()
