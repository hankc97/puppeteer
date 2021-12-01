import {newBrowser, stealthBrowser} from "../../scraper/browser.js";
import startDiscordController from "../../scraper/start-controller.js"

// flags:
// [0] -mode: n | s , default: none, def: n = none | s = stealth

const main = async () => {
    const args = process.argv.slice(2);
    let browser
    let mode = args[0]

    if (mode === 'n' || mode === undefined) {
        browser = await newBrowser()
    } 

    if (mode === 's') {
        browser = await stealthBrowser(browser, mode);
    }   

    startDiscordController(browser, mode)
}

main();
