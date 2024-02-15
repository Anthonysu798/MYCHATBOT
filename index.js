// delopy offline
// import dotenv from 'dotenv';
// dotenv.config({ path: './api.env' });
import path from 'path';
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION, // keep this secret
    apiKey: process.env.OPENAI_API_KEY, // keep this secret
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});

app.use(express.static('public'));


app.use(bodyParser.json());
app.use(cors());

// GET route for the root path
app.get("/", (req, res) => {
    res.send("Hello, world! The server is running.");
});

// POST route for chat completions
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message || "Hello World";
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        });

        // Corrected access to the response text based on the actual structure
        const responseText = completion.choices[0].message.content; 

        res.json({ response: responseText });
    } catch (error) {
        console.error("Error fetching completion from OpenAI:", error);
        res.status(500).json({ error: "Error fetching completion from OpenAI" });
    }
});




app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
