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
            slow: 30,
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        })
        
        browser.on("disconnected", async () => {
            console.error("Browser disconnected...");
            await browser.close();
            if (browser.process() != null) {
                browser.process().kill('SIGINT');
            }
        })
    } catch(err) {
        console.error("Could not create browser instance")
        return [null, err]
    }
    return [browser, null]
}

export const newStealthBrowser = async () => {
    puppeteerExtra.use(StealthPlugin());
    const browser = await puppeteerExtra.launch({
        headless: false,
        defaultViewport: null,
        slow: 100,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    })
    return [browser];
}