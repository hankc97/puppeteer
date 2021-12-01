import puppeteer from 'puppeteer'
import puppeteerExtra from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"

export const newBrowser = async () => {
    let browser;
    try {
        console.log("Opening the Browser...")
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        })
        
        browser.on("disconnected", async () => {
            console.error("Browser disconnected...");
            await browser.close();
            if (browser.process() != null) {
                browser.process().kill('SIGINT');
            }
        })
    } catch(err) {
        console.error("Could not create browser instance\terror\t", err)
    }
    return browser
}

export const stealthBrowser = async () => {
    puppeteerExtra.use(StealthPlugin());
    const browser = puppeteerExtra.launch({
        headless: false,
        defaultViewport: null
    })

    return browser;
}

