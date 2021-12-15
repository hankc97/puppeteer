const puppeteer = require("puppeteer")

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slow: 15,
    })

    const page = await browser.newPage()
    await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 3000 + Math.floor(Math.random() * 100),
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    });

    await page.goto("http://robins-app.herokuapp.com/#/")

    const metrics = await page.metrics();
    console.log(metrics);
    console.log("------------------------");
    console.log(`JSHEAPUSEDSIZE: ${metrics.JSHeapUsedSize}`); // memory 

}
main()
