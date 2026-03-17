const sendSlackError = require("../services/slackNotifier");

function errorMiddleware(err, req, res, next) {

    const errorMessage = `
    🚨 *API FAILED*
    
    Route: ${req.originalUrl}
    Method: ${req.method}
    Error: ${err.message}
    Time: ${new Date().toISOString()}

    \`\`\`
    ${err.stack}
    \`\`\`
    `;

    sendSlackError(errorMessage);

    res.status(500).json({
        message: "Internal Server Error"
    });
}

module.exports = errorMiddleware;