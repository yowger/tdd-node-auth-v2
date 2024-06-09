import "module-alias/register"

import "@src/config/database" // init database connection

import app from "@src/app"

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
