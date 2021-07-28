import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();

router.post("/", (ctx: Koa.Context) => {
    ctx.cookies.set("access_token", "", { httpOnly: false, maxAge: 0, path: "/" });
    ctx.response.status = 204;
});

export default router