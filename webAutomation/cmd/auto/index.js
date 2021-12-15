import {newBrowser, newStealthBrowser} from "../../automate/browser.js";
import startTicketMasterController from "../../automate/start-controller.js"

// flags:
// [0] -mode: n | s , default: none, def: n = none | s = stealth

const main = async () => {
    const args = process.argv.slice(2);
    let browser, err
    let mode = args[0]

    if (mode === 'n' || mode === undefined) {
        [browser, err] = await newBrowser()
    } 
    if (mode === 's') {
        [browser, err] = await newStealthBrowser()
    }
    if (err != null) {
        return console.error(err); 
    }

    startTicketMasterController(browser, mode)
}

main();