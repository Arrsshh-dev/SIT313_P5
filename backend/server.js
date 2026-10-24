
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from the local React development server.
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173"
    })
);

app.use(express.json({ limit: "10kb" }));

// Configure SendGrid using the private API key.
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Check whether the backend is running.
app.get("/", (req, res) => {
    res.status(200).json({
        message: "DEV@Deakin newsletter backend is running."
    });
});

// Handle newsletter subscriptions.
app.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body || {};

        // Validate the submitted email.
        if (typeof email !== "string" || !email.trim()) {
            return res.status(400).json({
                message: "Please enter your email address."
            });
        }

        const cleanEmail = email.trim();

        if (
            cleanEmail.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
        ) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        // Check that SendGrid is configured.
        if (
            !process.env.SENDGRID_API_KEY ||
            !process.env.SENDGRID_FROM_EMAIL
        ) {
            console.error("SendGrid environment variables are missing.");

            return res.status(500).json({
                message: "The email service is not configured."
            });
        }

        // Send a welcome email to the subscriber.
        const message = {
            to: cleanEmail,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: "Welcome to DEV@Deakin Daily Insider!",
            text: "Thank you for subscribing to the DEV@Deakin Daily Insider newsletter.",
            html: `
                <h2>Welcome to DEV@Deakin!</h2>
                <p>Thank you for subscribing to our Daily Insider newsletter.</p>
                <p>Stay tuned for articles, tutorials and updates.</p>
            `
        };

        const [sendGridResponse] = await sgMail.send(message);

        // Log the actual response from SendGrid for the task report.
        console.log(
            "SendGrid HTTP Status:",
            sendGridResponse.statusCode
        );

        if (sendGridResponse.statusCode !== 202) {
            console.error("SendGrid did not accept the email.");

            return res.status(502).json({
                message: "The email service could not accept your request."
            });
        }

        return res.status(202).json({
            message: "Subscription successful! Please check your inbox."
        });
    } catch (error) {
        const sendGridStatus = error.response?.statusCode;

        console.error(
            "Newsletter subscription error:",
            sendGridStatus || error.message
        );

        if (sendGridStatus === 400 || sendGridStatus === 403) {
            return res.status(502).json({
                message:
                    "The email service rejected the request. Please try again later."
            });
        }

        return res.status(502).json({
            message:
                "We could not send your subscription email. Please try again later."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Newsletter backend running on port ${PORT}`);
});
