import Koa from "koa";
import mongoose from "mongoose";
import { Binary } from 'mongodb';
import env from "../env";

interface ICollectionInfo {
    name: string,
    type: string,
    options: Record<string, unknown>,
    info: {
        readOnly: boolean,
        uuid: Binary,
    },
    idIndex: {
        v: number,
        key: Record<string, unknown>,
        name: string,
    },
}

async function connectDB() {
    const mongoURI = env.mongoURI;

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        const collections = await mongoose.connection.db.listCollections().toArray();
        
        let exist = collections.findIndex((coll: ICollectionInfo) => coll.name === "Event");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("Event", { capped: true, size: 100000, max: 1 });
        }

        exist = collections.findIndex((coll: ICollectionInfo) => coll.name === "Participants");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("Participants");
        }

        console.log('Database is online.');
    } catch (err) {
        throw err;
    }
}

async function prepareDB(): Promise<void> {
    await connectDB();
}

async function prepareDBMiddleware(ctx: Koa.Context, next: Koa.Next): Promise<any> {
    if (mongoose.connection.readyState == 0) {
        await connectDB();
    }
    return next();
}

export default { prepareDB, prepareDBMiddleware }