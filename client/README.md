# AI Interview Coach

An AI-powered full stack web app that generates role-specific 
interview questions and evaluates answers with scores and feedback.

## Live Demo
https://soft-bavarois-ed7142.netlify.app/

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- AI: Groq API (LLaMA 3.3 70B)
- Deployment: Netlify

## Features
- Role-specific question generation (Frontend, Backend, Full Stack, DevOps, Data Science)
- Junior / Mid / Senior difficulty levels
- AI-powered answer evaluation with scores out of 10
- Actionable feedback and example answers
- Session summary with overall performance score

## Setup
1. Clone the repo
2. Add GROQ_API_KEY to server/.env
3. cd server && npm install && node index.js
4. cd client && npm install && npm start