import db from "./v1/db";
import app from "./v1/app";
import env from "./env";
import { updateHistory } from "./v1/crawler";

db.prepareDB().then(() => {
    updateHistory();
    setInterval(updateHistory, 1000*60*60); // 1시간마다 정보 수집
});

app.listen(env.port, () => {
    console.log(`Listening to http://0.0.0.0:${env.port}`);
});