import { model, Schema } from "mongoose"

import type { Document } from "mongoose"

export interface User {
    name: string
    email: string
    password: string
    verified?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface UserDoc extends User, Document {}

const userSchema = new Schema<UserDoc>(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            lowercase: true,
        },
        email: {
            type: Schema.Types.String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
            select: false,
        },
        verified: {
            type: Schema.Types.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const UserModel = model<User>("User", userSchema)

export default UserModel
