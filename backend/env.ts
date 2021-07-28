import dotenv from "dotenv"
dotenv.config();

interface IEnv {
    port: string,
    mongoURI: string,
    accessTokenKey: string,
    adminPassword: string,
    clientHost: string
}

if (process.env.PORT === undefined) {
    throw new Error("PORT is not set.");
}
if (process.env.MONGO_URI === undefined) {
    throw new Error("MONGO_URI is not set.");
}
if (process.env.ACCESS_SECRET_KEY === undefined) {
    throw new Error("ACCESS_SECRET_KEY is not set.");
}
if (process.env.ADMIN_PASSWORD === undefined) {
    throw new Error("ADMIN_PASSWORD is not set.");
}
if (process.env.CLIENT_HOST === undefined) {
    throw new Error("CLIENT_HOST is not set.");
}

const env:IEnv = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    accessTokenKey: process.env.ACCESS_SECRET_KEY,
    adminPassword: process.env.ADMIN_PASSWORD,
    clientHost: process.env.CLIENT_HOST
}

export default env