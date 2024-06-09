import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

let mongod: MongoMemoryServer

export async function setupTestEnvironment() {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    await mongoose.connect(uri)
}

export async function teardownTestEnvironment() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

export async function clearDatabase() {
    const collections = mongoose.connection.collections

    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}
