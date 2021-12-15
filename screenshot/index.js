import puppeteer from "puppeteer";

const URL = "https://www.google.com/";

const Screenshot = async () => {
    try {
        // new chromium browser
        const browser = await puppeteer.launch({
            headless: true,
        });

        // new page/tab
        const page = await browser.newPage();
        await page.goto(URL, {waitUntil: "networkidle2"});
        await page.screenshot({ path: './google.png', fullPage: true});
        await page.close();
        await browser.close();
    } catch (err) {
        console.error(err)
    }
};

Screenshot();