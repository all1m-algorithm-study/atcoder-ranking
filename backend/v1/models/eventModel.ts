import { IEvent } from "../types";
import { Model, Document, Schema, model } from "mongoose"

export interface IEventDocument extends Document, IEvent { }

const eventSchema = new Schema({
    startTime: Date,
    endTime: Date,
    hideName: Boolean,
})

export const EventModel = model<IEvent>("Event", eventSchema);
