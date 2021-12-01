// https://stackoverflow.com/questions/55678095/bypassing-captchas-with-headless-chrome-using-puppeteer
import randomUseragent from "random-useragent"

export const newPage = async (browser, URL) => {
    let page;

    try {
        page = await browser.newPage();
        console.log(`navigating to ${URL}...`)
        await page.goto(URL)
    } catch (err) {
        console.log(err)
        return [err]
    }

    return [null, page];
}

export const newStealthPage = async (browser, URL) => {
    let page;
    const userAgent = randomUseragent.getRandom();
    const USER_AGENT = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
    const UA = USER_AGENT;

    try {
        page = await browser.newPage();

        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        await page.setUserAgent(UA);
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(0);

        await page.evaluateOnNewDocument(() => {
            // Pass webdriver check
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.evaluateOnNewDocument(() => {
            // Pass chrome check
            window.chrome = {
                runtime: {},
                // etc.
            };
        });

        await page.evaluateOnNewDocument(() => {
            //Pass notifications check
            const originalQuery = window.navigator.permissions.query;
            return window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
            );
        });

        await page.evaluateOnNewDocument(() => {
            // Overwrite the `plugins` property to use a custom getter.
            Object.defineProperty(navigator, 'plugins', {
                // This just needs to have `length > 0` for the current test,
                // but we could mock the plugins too if necessary.
                get: () => [1, 2, 3, 4, 5],
            });
        });

        await page.evaluateOnNewDocument(() => {
            // Overwrite the `languages` property to use a custom getter.
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        });

        await page.goto(URL, { waitUntil: 'networkidle2',timeout: 0 } );
    } catch (err) {
        return [console.error(err)]
    }
    return [null, page];
}

