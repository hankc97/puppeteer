const BtConstant = require("../../secrets/bt-constants")

beforeAll(async () => {
    await page.goto(BtConstant.EXPECTED_ROBIN_URL)

    await page.waitForSelector(".home-page-demo-button");
    await page.evaluate(()=>document.querySelector('.home-page-demo-button').click())

    await page.waitForSelector(".DEMO-login-button")
    await page.evaluate(()=>document.querySelector('.DEMO-login-button').click())
})

describe("portfolio sidebar tickers", () => {
    it ("should click and resolve to `TSLA` ticker page", async () => {
        await page.waitForSelector(".single-ticker-user-order")
        await page.evaluate(()=>document.querySelector('.single-ticker-user-order').click())

        await expect(await page.url()).toMatch("s")
    })
})