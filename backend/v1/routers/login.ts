import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import Cookie from "koa-cookie";
import jwt from "jsonwebtoken";
import env from "../../env";
import { ILoginRequest, ITokenData } from "../types";

const router = new Router();
router.use(BodyParser());
router.use(Cookie());

router.post("/", async (ctx: Koa.Context) => {
    const body = <ILoginRequest>(ctx.request.body as unknown);

    if (body.password === undefined || body.password === "") {
        ctx.throw(400, "password is undefined.");
    }

    if (env.adminPassword !== body.password) {
        ctx.throw(401, "password is incorrect.")
    }

    const res:ITokenData = {
        authDate: new Date()
    };

    const accessToken = jwt.sign(res, env.accessTokenKey, { expiresIn: "3h" });
    ctx.cookies.set("access_token", accessToken, { httpOnly: false, path: "/" });
    ctx.response.body = res;
});

export default router;