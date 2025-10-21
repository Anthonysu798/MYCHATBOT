# 🤖 ChatBot using DeepSeek API

A stunning, production-ready chatbot powered by DeepSeek's V3 model with beautiful 3D animations and modern UI. This web application provides an immersive chat experience with rotating geometric shapes, particle effects, and glassmorphism design.

## ✨ Features

- 💬 Real-time chat interface with DeepSeek-V3
- 🎨 Stunning 3D animated background using Three.js
- 🌟 Glassmorphism design with smooth animations
- 🚀 Fast response times using DeepSeek-chat model
- 📱 Fully responsive design for all devices
- 🔒 Secure API key management
- ⌨️ Keyboard shortcuts for better UX
- 🎯 Production-ready code

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **AI**: DeepSeek API (DeepSeek-V3)
- **Frontend**: Three.js, Vanilla JavaScript, HTML5, CSS3
- **Design**: Glassmorphism, Gradient animations, Particle effects
- **Dependencies**:
  - express
  - openai (for DeepSeek compatibility)
  - body-parser
  - cors
  - three

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)
- A [DeepSeek API account](https://platform.deepseek.com/)

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

Create a `.env` file in the root directory and add your DeepSeek credentials:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual API key:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
PORT=3000
```

**Getting your DeepSeek API Key:**
- Visit [DeepSeek Platform](https://platform.deepseek.com/api_keys)
- Sign up or log in to your account
- Navigate to API Keys section
- Create a new API key and copy it
- Paste it in your `.env` file

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
vercel env add DEEPSEEK_API_KEY
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
   - `DEEPSEEK_API_KEY` - Your DeepSeek API key
6. Click "Deploy"

#### Setting Environment Variables on Vercel

In your Vercel project dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add the following variable:
   - **Name**: `DEEPSEEK_API_KEY`, **Value**: Your DeepSeek API key
3. Make sure to add it for all environments (Production, Preview, Development)

### Other Deployment Options

You can also deploy to:
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Heroku](https://heroku.com/)

**Important**: Always set up environment variables in your hosting platform's dashboard before deploying.

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your DeepSeek API keys secret
- The `.gitignore` file is configured to exclude sensitive files
- Monitor your DeepSeek API usage to avoid unexpected charges
- DeepSeek offers competitive pricing compared to other AI providers

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

- [DeepSeek API Documentation](https://api-docs.deepseek.com/)
- [DeepSeek Platform](https://platform.deepseek.com/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🐛 Troubleshooting

**Error: "Error fetching completion from DeepSeek API"**
- Check that your API key is valid
- Ensure you have credits in your DeepSeek account
- Verify your internet connection
- Make sure the API key is properly set in your `.env` file

**Server won't start:**
- Make sure port 3000 is not already in use
- Check that all dependencies are installed (`npm install`)
- Verify your `.env` file is configured correctly with `DEEPSEEK_API_KEY`

**3D animations not showing:**
- Check browser console for JavaScript errors
- Ensure Three.js is loading properly
- Try hard-refreshing the page (Ctrl+Shift+R or Cmd+Shift+R)
