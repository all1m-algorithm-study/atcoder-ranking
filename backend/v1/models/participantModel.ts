import { IParticipant } from "../types";
import { Model, Document, Schema, model } from "mongoose"

const ContestHistorySchemaDef = {
    date: Date,
    title: String,
    rank: Number,
    performance: Number,
    newRating: Number,
    diff: String
}

export interface IParticipantDocument extends Document, IParticipant { }

const participantSchema = new Schema({
    handle: String,
    nickname: String,
    name: String,
    history: [ContestHistorySchemaDef]
});

export const ParticipantModel:Model<IParticipantDocument> = model("Participant", participantSchema);