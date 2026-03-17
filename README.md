# 📢 Slack API Error Alerts with Node.js

Automatically send **Slack notifications whenever an API fails** in a Node.js (Express) application. This project demonstrates how to use **Slack Incoming Webhooks + Global Error Middleware** to monitor backend failures in real time.

---

# 🚀 Features

✅ Automatic Slack alerts for API failures
✅ Global Express error middleware
✅ Structured Slack error messages
✅ Environment variable support
✅ Easy integration with any Node.js backend
✅ Production-ready structure

---

# 🏗 Architecture

```
Client Request
      │
      ▼
Node.js API
      │
      ▼
Error Occurs
      │
      ▼
Global Error Middleware
      │
      ▼
Slack Webhook
      │
      ▼
Slack Channel Alert
```

---

# 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/slack-api-error-alerts-nodejs.git
cd slack-api-error-alerts-nodejs
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

Required packages:

```
express
axios
dotenv
```

---

# ⚙️ Environment Setup

Create a `.env` file:

```
SLACK_WEBHOOK_URL=your_slack_webhook_url
PORT=3000
```

---

# 🔔 Slack Webhook Setup

1. Go to

```
https://api.slack.com/apps
```

2. Create **New App**

3. Enable **Incoming Webhooks**

4. Click **Add Webhook to Workspace**

5. Select a channel like:

```
#api-errors
```

6. Copy webhook URL and add it to `.env`

---

# 📂 Project Structure

```
project-root
│
├── middleware
│   └── errorMiddleware.js
│
├── services
│   └── slackNotifier.js
│
├── routes
│   └── sampleRoute.js
│
├── app.js
├── package.json
└── .env
```

---

# 🧠 Slack Notification Service

`services/slackNotifier.js`

```javascript
const axios = require("axios");

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

async function sendSlackError(message) {
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: message
    });
  } catch (error) {
    console.error("Slack notification failed:", error.message);
  }
}

module.exports = sendSlackError;
```

---

# ⚠️ Global Error Middleware

`middleware/errorMiddleware.js`

```javascript
const sendSlackError = require("../services/slackNotifier");

function errorMiddleware(err, req, res, next) {

  const message = `
🚨 API FAILED

Route: ${req.originalUrl}
Method: ${req.method}
Error: ${err.message}
Time: ${new Date().toISOString()}
`;

  sendSlackError(message);

  res.status(500).json({
    message: "Internal Server Error"
  });
}

module.exports = errorMiddleware;
```

---

# 🧪 Example Route

```javascript
router.get("/test-error", async (req, res, next) => {

  try {

    throw new Error("Database connection failed");

  } catch (error) {

    next(error);

  }

});
```

---

# ▶️ Run the Server

```
node app.js
```

Server runs on:

```
http://localhost:3000
```

Test endpoint:

```
http://localhost:3000/api/test-error
```

---

# 📩 Slack Alert Example

```
🚨 API FAILED

Route: /api/test-error
Method: GET
Error: Database connection failed
Time: 2026-03-17T10:50:22Z
```

---

# 🔒 Security Best Practices

* Never commit `.env` file
* Keep webhook URL secret
* Add `.env` to `.gitignore`

```
.env
node_modules
```

---

# 🧩 Future Improvements

Possible enhancements:

* Slack Block Kit formatting
* API latency monitoring
* User tracking in errors
* Integration with Sentry
* Production logging system

---

# 📜 License

MIT License

---

# 👨‍💻 Author

**Pankaj Ram**
Cross-platform Mobile Developer
Flutter | Backend | System Design

---

# ⭐ Support

If you find this useful, please **⭐ star the repository**.

---
