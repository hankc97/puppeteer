const puppeteer = require("puppeteer")
const randomUseragent = require('random-useragent');

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slow: 15,
    })

    const UA = randomUseragent.getRandom()

    const page = await browser.newPage()
    await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 3000 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });

    await page.setUserAgent(UA);

    await page.goto("https://www.apple.com/")

    await page.setRequestInterception(true)
    page.on('request', (req) => {
        if(req.resourceType() == 'image'){
            req.abort();
        } else {
            req.continue();
        }
    });

}
main()



