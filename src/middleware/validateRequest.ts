import { z, ZodSchema } from "zod"
import { NextFunction, Request, Response } from "express"

export enum ValidationSource {
    body = "body",
    query = "query",
    params = "params",
}

const validateRequest =
    (
        schema: ZodSchema<any>,
        source: ValidationSource = ValidationSource.body
    ) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[source])
            next()
        } catch (error) {
            console.log("error ", error)

            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }))

                res.status(400).json({
                    error: "Invalid data",
                    details: errorMessages,
                })
            }
        }
    }

export default validateRequest
