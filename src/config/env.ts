import dotenv from "dotenv"
import z from "zod"

dotenv.config()

const envSchema = z.object({
    DATABASE: z.string().trim().min(1),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
    console.error(
        "Environment variable validation error:",
        result.error.format()
    )
    process.exit(1) 
}

const env = result.data
export default env
