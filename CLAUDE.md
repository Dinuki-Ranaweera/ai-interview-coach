# AI Interview Coach

## What this is
A full stack web app that generates role-specific interview questions 
using Claude API and evaluates answers with scores and feedback.

## Stack
- Frontend: React (create-react-app), Tailwind CSS
- Backend: Node.js, Express
- AI: Anthropic Claude API (@anthropic-ai/sdk)
- Deploy: Vercel

## Folder structure
- /client — React frontend
- /server — Node/Express backend

## Rules
- Always use async/await, never .then()
- Never use var, use const and let only
- Keep React components under 150 lines
- Always handle loading and error states in the UI
- Never hardcode the API key, always use process.env