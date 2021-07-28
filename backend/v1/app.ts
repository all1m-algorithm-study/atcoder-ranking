import Koa from "koa";
import Router from "koa-router";
import Logger from "koa-logger";
import cors from "@koa/cors";
import db from "./db";

import event from "./routers/event";
import participants from "./routers/participants";
import login from "./routers/login";
import logout from "./routers/logout";
import env from "../env";

const app = new Koa();

const corsOption = {
    origin: env.clientHost,
    credentials: true
};

app.use(cors(corsOption));
app.use(Logger());
app.use(db.prepareDBMiddleware);

const router = new Router();
router.use("/v1/event", event.routes());
router.use("/v1/participants", participants.routes());
router.use("/v1/login", login.routes());
router.use("/v1/logout", logout.routes());

app.use(router.routes());

export default app;