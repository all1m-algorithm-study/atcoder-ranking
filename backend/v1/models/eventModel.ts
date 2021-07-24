import { Model, Document, Schema, model } from "mongoose"

export interface IEvent extends Document {
    startTime: Date,
    endTime: Date
}

const eventSchema = new Schema({
    startTime: Date,
    endTime: Date
})

export const EventModel:Model<IEvent> = model("Event", eventSchema);