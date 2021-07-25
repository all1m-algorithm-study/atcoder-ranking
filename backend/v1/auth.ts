import Koa from "koa";
import jwt from "jsonwebtoken";
import env from "../env"
import { ITokenData } from "./types";

export default function validateToken(ctx: Koa.Context): ITokenData | undefined {
    const token = ctx.cookies.get("access_token");
    if (!token) {
        return undefined;
    }
    try {
        const decoded = jwt.verify(token, env.accessTokenKey) as ITokenData;
        const tokenData:ITokenData = {
            authDate: decoded.authDate
        };
        const freshToken = jwt.sign(tokenData, env.accessTokenKey, { expiresIn: "3h" });
        ctx.cookies.set("access_token", freshToken, { httpOnly: false });

        return tokenData;
    } catch (err) {
        return undefined
    }
}