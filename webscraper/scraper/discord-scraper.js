import * as DiscordConstants from "../secrets/discord-constants.js"

const DiscordScraper = {
    login: async (page, URL) => {
        try {
            console.log('submitting Discord Credentials...')
            await page.waitForSelector(DiscordConstants.EXPECTED_DISCORD_EMAIL_SELECTOR)
            await page.type(DiscordConstants.EXPECTED_DISCORD_EMAIL_SELECTOR, DiscordConstants.DISCORD_USERNAME)
    
            await page.waitForSelector(DiscordConstants.EXPECTED_DISCORD_PASSWORD_SELECTOR)
            await page.type(DiscordConstants.EXPECTED_DISCORD_PASSWORD_SELECTOR, DiscordConstants.DISCORD_PASSWORD)

            console.log("waiting for human captcha solver...");
            await Promise.all([
                page.waitForNavigation({waitUntil: "networkidle2", timeout: 100000}),
                page.click(DiscordConstants.EXPECTED_DISCORD_SUBMITBUTTON_SELECTOR),
            ])

            if (await page.url() === URL) {
                console.log("successfully logged into discord...");
            } else {
                return console.error("failed to log into discord...")
            }

        } catch (err) {
            return console.error(err)
        }
    },
    async relayDiscordMessage(page) {
        try {
            await page.waitForSelector(DiscordConstants.EXPECTED_DISCORD_MESSAGES_SELECTOR);

            const initialHrefElementArray = await page.$$(DiscordConstants.EXPECTED_DISCORD_MESSAGES_SELECTOR)
            const initialHrefElement = initialHrefElementArray[initialHrefElementArray.length - 1]
            let initialMessage = await initialHrefElement.evaluate((node) => node.innerText)
            console.log(`displaying first message of the day...`);
            console.log("-------------------------------------------------------");
            console.log(`${initialMessage}`);

            const readLoop = async () => {
                const lastHrefElementArray = await page.$$(DiscordConstants.EXPECTED_DISCORD_MESSAGES_SELECTOR)
                const lastHrefElement = lastHrefElementArray[lastHrefElementArray.length - 1]
                let lastMessage = await lastHrefElement.evaluate((node) => node.innerText)
                if (lastMessage !== initialMessage) {
                    console.log("-------------------------------------------------------");
                    console.log(`displaying last message...`);
                    console.log("-------------------------------------------------------");
                    console.log(`${lastMessage}`);
                    initialMessage = lastMessage;

                    // Do stuff with message here
                    // Slack.relayMessageToSlack(lastMessage);
                    // SMSRelayer.sendEmailToSMS(lastMessage);
                    // TdRelayer.relayMessageToTd(lastmessage);
                }
                return await readLoop();
            };
            await readLoop();
        } catch (err) {
            return console.error(err)
        }
    }
}

export default DiscordScraper