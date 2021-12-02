const BtConstant = require("../../secrets/bt-constants")

beforeAll(async () => {
    await page.goto(BtConstant.EXPECTED_ROBIN_URL)
})

describe("homepage", () => {
    it (`should display h2 main header: "Investing for\nEveryone"`, async () => {
        await page.waitForSelector(".top-about1")
        const href = await page.$(".top-about1")
        const msg = await href.evaluate( node => node.innerText)

        await expect(msg).toMatch("Investing for\nEveryone")
    })
})

