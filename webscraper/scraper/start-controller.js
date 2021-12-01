import {newPage, newStealthPage} from "./page.js"
import DiscordScraper from "./discord-scraper.js"
import * as DiscordConstants from "../secrets/discord-constants.js"

const startDiscordController = async (browser, mode) => {
    const URL = DiscordConstants.TEST_DISCORD_SERVER
    let err, page;

    if (mode === 'n' || mode === undefined) {
        [err, page] = await newPage(browser, URL)
    }
    if (mode === 's') {
        [err, page] = await newStealthPage(browser, URL)
    }
    if (err != null) {
        if (page) await page.close()
        return console.error(err, "opening new page with url")
    }

    // page events
    await DiscordScraper.login(page, URL);
    await DiscordScraper.relayDiscordMessage(page);
    
    // close events
    await page.close();
    await browser.close();
}

export default startDiscordController