import {newPage, newStealthPage} from "./page.js"
import TickerMasterAutomation from "./ticketmaster_auto.js"
import * as TickerMasterConstants from "../secrets/tickermaster-constants.js"

const startTicketMasterController = async (browser, mode) => {
    const URL = TickerMasterConstants.EXPECTED_TICKERMASTER_URL
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
    await TickerMasterAutomation.login(page, URL)
    
    // close events
    // await page.close();
    // await browser.close();
}

export default startTicketMasterController