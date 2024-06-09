/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
}
