import UserModel from "@src/models/UserModel"

import { User } from "@src/models/UserModel"

export const createUser = async (input: User) => {
    const createdUser = await UserModel.create(input)

    const { password, ...user } = createdUser.toObject()

    return user
}

export const findUserByEmail = async (email: string) => {
    return UserModel.findOne({ email })
        .select("_+id +name +email +password +verified +createdAt +updatedAt")
        .lean()
        .exec()
}
