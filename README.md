# CampusGPT 🎓

An AI-powered multimodal college assistant built for the Google Hackathon.

## Features
- **Multimodal Notes**: Upload PDFs/Images -> Get Summaries, Flashcards, Q&A (Powered by Gemini 1.5 Flash).
- **Study Planner**: Generate personalized study schedules based on exam dates (Gemini Pro).
- **AI Tutor**: Instant explanations and analogies for any topic.
- **Teacher Tools**: Quiz generation (Bloom's Taxonomy).

## Prerequisites
- Node.js (v18+)
- Gemini API Key

## Setup & Run

**🚀 [Read the Deployment Guide](./DEPLOYMENT_GUIDE.md) for hosting on Vercel & Render!**

### 1. Backend
```bash
cd server
npm install
# Create a .env file based on the example and add your GEMINI_API_KEY
npm start
```
Server runs on `http://localhost:5000`

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

## Tech Stack
- **Backend**: Node.js, Express, Google Generative AI SDK, Multer.
- **Frontend**: React, Vite, TailwindCSS, Lucide Icons, Axios.
