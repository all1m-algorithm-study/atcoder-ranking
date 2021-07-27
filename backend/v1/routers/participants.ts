import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import { ParticipantModel } from "../models/participantModel";
import { EventModel } from "../models/eventModel";
import { IParticipant, IParticipantsGetResponse, IParticipantsPostRequest } from "../types";
import validateToken from "../auth";

const router = new Router();
router.use(BodyParser());

router.get("/", async (ctx: Koa.Context) => {
    const parts = await ParticipantModel.find().exec();
    const event = await EventModel.findOne().exec();
    const currDate = new Date();

    if (event?.hideName) {
        parts.forEach((part: IParticipant) => {
            part.name = "";
            part.avatar = "https://img.atcoder.jp/assets/icon/avatar.png";
            part.handle = "";
        });
    }

    const res:IParticipantsGetResponse = {
        participants: parts
    };
    ctx.response.body = res;
});

router.post("/", async (ctx: Koa.Context) => {
    const token = validateToken(ctx);
    if (token === undefined) {
        ctx.throw(401, "It is unauthorized.");
    }

    const body = <IParticipantsPostRequest>(ctx.request.body as unknown);
    if (body.participants === undefined) {
        ctx.throw(400, "participants is undefined.");
    }

    let partsAreValid = true;
    body.participants.forEach((part: IParticipant) => {
        if (part === undefined || part.handle === undefined ||
            part.nickname === undefined || part.name === undefined) {
            partsAreValid = false;
        }
    });

    if (!partsAreValid) {
        ctx.throw(400, "At least one of elements are invalid.");
    }

    await ParticipantModel.deleteMany().exec();
    ctx.response.body = await ParticipantModel.insertMany(body.participants);
});

export default router;