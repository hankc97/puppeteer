const BtConstant = require("../../secrets/bt-constants")

beforeAll(async () => {
    await page.goto(BtConstant.EXPECTED_ROBIN_URL)
})

describe("demo login", () => {
    it ("should click and resolve demo page", async () => {
        await page.waitForSelector(".home-page-demo-button");
        await page.evaluate(()=>document.querySelector('.home-page-demo-button').click())

        expect(await page.url()).toMatch(BtConstant.EXPECTED_ROBIN_DEMO_URL)
    })

    it ("should click demo on demo page and resolve to portfolio page", async () => {
        await page.waitForSelector(".DEMO-login-button")
        await page.evaluate(()=>document.querySelector('.DEMO-login-button').click())
        await page.waitForSelector(".search-bar")

        expect(await page.url()).toMatch(BtConstant.EXPECTED_ROBIN_PORTFOLIO_URL)
    })
})

