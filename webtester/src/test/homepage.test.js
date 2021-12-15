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

    it (`should display fractal shares image on right`, async () => {
        await page.waitForSelector(".static-image-home-page")
        const href = await page.$(".static-image-home-page")
        const attrValue = await href.evaluate(node => node.getAttribute("src"))

        await expect(attrValue).toMatch("https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png")
    })
})

