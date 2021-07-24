import Mongoose from "mongoose";
import { Model, Document, Schema, model } from "mongoose"
/*eslint-disable */
const AutoIncrement = require("mongoose-sequence")(Mongoose);
/*eslint-enable */

export interface IContestHistory extends Document {
    date: Date,
    title: string,
    rank: number,
    performance: number,
    newRating: number,
    diff: number
}

export const ContestHistorySchemaDef = {
    date: Date,
    title: String,
    rank: Number,
    performance: Number,
    newRating: Number,
    diff: Number
}

export interface IParticipant extends Document {
    docId: number,
    handle: string,
    nickname: string,
    name: string,
    history: IContestHistory[]
}

const participantSchema = new Schema({
    docId: {
        type: Number,
        unique: true
    },
    handle: String,
    nickname: String,
    name: String,
    history: [ContestHistorySchemaDef]
});

participantSchema.plugin(AutoIncrement, { inc_field: "docId" });
export const ParticipantModel:Model<IParticipant> = model("Participant", participantSchema);