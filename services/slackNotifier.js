const axios = require("axios");

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendSlackError(message) {
    try {
        await axios.post(SLACK_WEBHOOK_URL, {
            text: message,
        });
    } catch (error) {
        console.error("Slack notification failed:", error.message);
    }
}

module.exports = sendSlackError;