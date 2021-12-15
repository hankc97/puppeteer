// https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree
const puppeteer = require("puppeteer")

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slow: 15,
    })
    const page = await browser.newPage()

    await page.goto("http://robins-app.herokuapp.com/#/")

    const snapshot = await page.accessibility.snapshot();
    console.log(snapshot);
    console.log("------------------------");
}
main()