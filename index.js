// DeepSeek API Integration
import path from 'path';
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Initialize DeepSeek client (OpenAI-compatible)
const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com'
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// GET route for the root path - serves the HTML interface
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

// POST route for chat completions
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message || "Hello World";
        const completion = await deepseek.chat.completions.create({
            model: "deepseek-chat", // DeepSeek-V3 model
            messages: [{ role: "user", content: userMessage }],
        });

        // Extract response text from DeepSeek API
        const responseText = completion.choices[0].message.content;

        res.json({ response: responseText });
    } catch (error) {
        console.error("Error fetching completion from DeepSeek:", error);
        res.status(500).json({ error: "Error fetching completion from DeepSeek API" });
    }
});




// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

// Export for Vercel serverless
export default app;
