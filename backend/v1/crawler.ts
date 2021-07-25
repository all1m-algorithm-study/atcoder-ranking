import axios from "axios";
import cheerio from "cheerio";
import { IContestHistory } from "./types";
import { ParticipantModel, IParticipantDocument } from "./models/participantModel";
import { EventModel, IEventDocument } from "./models/eventModel";

async function getHistory(handle: string): Promise<IContestHistory[] | undefined> {
    try {
        const html = await axios.get(`https://atcoder.jp/users/${handle}/history`);
        const historyList:IContestHistory[] = [];
        const $ = cheerio.load(html.data);
        const $rows = $("tbody").children("tr");

        $rows.each((_, elem) => {
            historyList.push({
                date: new Date($(elem).find("td:nth-child(1) time").text()),
                title: $(elem).find("td:nth-child(2) a:first-child").text(),
                rank: Number($(elem).find("td:nth-child(3) a").text()),
                performance: Number($(elem).find("td:nth-child(4)").text()),
                newRating: Number($(elem).find("td:nth-child(5) span").text()),
                diff: $(elem).find("td:nth-child(6)").text()
            });
        });
        return historyList;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function updateSingleDocument(part: IParticipantDocument, event: IEventDocument) {
    const history = await getHistory(part.handle);
    if (history === undefined) {
        console.log(`\t${part.handle}: Failed`);
    } else {
        part.history = [];
        let added = 0;
        history.forEach((h: IContestHistory) => {
            if (event.startTime <= h.date && h.date <= event.endTime) {
                part.history.push(h);
                ++added;
            }
        });
        console.log(`\t${part.handle}: OK (${added})`);
        part.save();
    }
}

export async function updateHistory() {
    const event = await EventModel.findOne().exec();
    if (event === null) {
        return;
    }
    console.log("Fetching competition histories...");

    try {
        const parts = await ParticipantModel.find().exec();
        const promises:Promise<void>[] = [];
        parts.forEach((part: IParticipantDocument) => {
            promises.push(updateSingleDocument(part, event));
        });

        await Promise.all(promises);
        console.log("Finished.");
    } catch (err) {
        console.error("updateHistory: An exception has occurred.");
        console.error(err)
    }
}