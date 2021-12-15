const BtConstant = require("../../secrets/bt-constants")

beforeAll(async () => {
    await page.goto(BtConstant.EXPECTED_ROBIN_URL)
})

describe("homepage", () => {
    it (`should display h2 main header: "Investing for\nEveryone"`, async () => {
        const header = await page.$("h1")
        const snapshot = await page.accessibility.snapshot({
            element: header
        });

        await expect(snapshot.name).toMatch("BulleTrades")
    })
})