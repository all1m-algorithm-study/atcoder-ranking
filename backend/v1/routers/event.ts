import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import { EventModel } from "../models/eventModel";
import { IEvent } from "../types";
import validateToken from "../auth";

const router = new Router();
router.use(BodyParser());

router.get("/", async (ctx: Koa.Context) => {
    const found = await EventModel.findOne().exec();
    if (found === null) {
        const newEvent = new EventModel();
        newEvent.startTime = new Date(0);
        newEvent.endTime = new Date(0);
        const saved = await newEvent.save();
        ctx.response.body = saved;
    } else {
        ctx.response.body = found;
    }
});

router.post("/", async (ctx: Koa.Context) => {
    const token = validateToken(ctx);
    if (token === undefined) {
        ctx.throw(401, "It is unauthorized.");
    }

    const body = <IEvent>(ctx.request.body as unknown);
    if (body.startTime === undefined || body.endTime === undefined) {
        ctx.throw(400, "startTime or endTime is undefined.");
    }

    if (body.endTime < body.startTime) {
        ctx.throw(400, "startTime is greater then endTime.");
    }

    let toUpdate = await EventModel.findOne().exec();
    if (toUpdate === null) {
        toUpdate = new EventModel();
    }

    toUpdate.startTime = body.startTime;
    toUpdate.endTime = body.endTime;
    ctx.response.body = await toUpdate.save();
});

export default router;