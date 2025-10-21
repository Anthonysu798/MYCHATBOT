# 🤖 ChatBot using OpenAI API

A simple, elegant chatbot powered by OpenAI's GPT-3.5-turbo model. This web application provides an interactive chat interface where users can have conversations with an AI assistant.

## ✨ Features

- 💬 Real-time chat interface
- 🎨 Beautiful purple-themed UI
- 🚀 Fast response times using GPT-3.5-turbo
- 📱 Responsive design
- 🔒 Secure API key management

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Dependencies**:
  - express
  - openai
  - body-parser
  - cors
  - dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)
- An [OpenAI API account](https://platform.openai.com/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anthonysu798/MYCHATBOT.git
cd MYCHATBOT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your OpenAI credentials:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual credentials:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ORGANIZATION=your_organization_id_here
PORT=3000
```

**Getting your OpenAI credentials:**
- API Key: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Organization ID: [https://platform.openai.com/account/organization](https://platform.openai.com/account/organization)

### 4. Run the application

```bash
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT)

## 💻 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Type your message in the input field
3. Click "Send" or press Enter
4. Wait for the AI chatbot to respond
5. Continue the conversation!

## 📁 Project Structure

```
MYCHATBOT/
├── index.js           # Main server file
├── package.json       # Project dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── .env              # Environment variables (create this)
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore file
├── README.md         # Project documentation
├── public/
│   └── style.css     # Stylesheet for the chat interface
└── views/
    └── index.html    # Main HTML page
```

## 🌐 Deployment

### Deploying to Vercel (Recommended)

This project is configured and ready for deployment on Vercel. Follow these steps:

#### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to your Vercel account:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

4. Add environment variables:
```bash
vercel env add OPENAI_API_KEY
vercel env add OPENAI_ORGANIZATION
```

5. Redeploy with environment variables:
```bash
vercel --prod
```

#### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/) and sign up/login
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in the project settings:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `OPENAI_ORGANIZATION` - Your OpenAI organization ID
6. Click "Deploy"

#### Setting Environment Variables on Vercel

In your Vercel project dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add the following variables:
   - **Name**: `OPENAI_API_KEY`, **Value**: Your OpenAI API key
   - **Name**: `OPENAI_ORGANIZATION`, **Value**: Your organization ID
3. Make sure to add them for all environments (Production, Preview, Development)

### Other Deployment Options

You can also deploy to:
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Heroku](https://heroku.com/)

**Important**: Always set up environment variables in your hosting platform's dashboard before deploying.

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API keys secret
- The `.gitignore` file is configured to exclude sensitive files
- Monitor your OpenAI API usage to avoid unexpected charges

## 📝 API Reference

### POST /chat

Sends a message to the chatbot and receives a response.

**Request Body:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "response": "I'm doing well, thank you for asking! How can I help you today?"
}
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**Anthony Su**

## 📄 License

This project is [ISC](https://opensource.org/licenses/ISC) licensed.

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/introduction)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🐛 Troubleshooting

**Error: "Error fetching completion from OpenAI"**
- Check that your API key is valid
- Ensure you have credits in your OpenAI account
- Verify your internet connection

**Server won't start:**
- Make sure port 3000 is not already in use
- Check that all dependencies are installed (`npm install`)
- Verify your `.env` file is configured correctly
