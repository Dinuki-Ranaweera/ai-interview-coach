# AI Interview Coach

An AI-powered full stack web app built using prompt engineering 
techniques to generate role-specific interview questions and 
evaluate candidate answers with detailed AI feedback.

## Live Demo
https://soft-bavarois-ed7142.netlify.app/

## Built With
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Groq API (LLaMA 3.3 70B) — powered by prompt engineering
- **Deployment:** Netlify + GitHub

## About This Project
This project was built as part of an intensive AI development 
sprint focused on prompt engineering and building with LLMs. 
The app uses carefully engineered prompts to generate 
role-specific interview questions and structured evaluation 
feedback from an AI model.

## Features
- Role-specific question generation (Frontend, Backend, 
  Full Stack, DevOps, Data Science)
- Junior / Mid / Senior difficulty levels  
- AI-powered answer evaluation with scores out of 10
- Actionable feedback and example answers
- Session summary with overall performance score

## Prompt Engineering Highlights
- Structured JSON output enforcement via prompt design
- Role and level aware question generation
- Consistent evaluation rubric through system prompts
- Error handling for malformed AI responses

## Setup
1. Clone the repo
2. Get a free API key at console.groq.com
3. Create server/.env with GROQ_API_KEY=your_key
4. cd server && npm install && node index.js
5. cd client && npm install && npm start
