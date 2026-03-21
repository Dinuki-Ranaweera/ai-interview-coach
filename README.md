# AI Interview Coach

A full stack AI-powered web app that generates role-specific 
interview questions and evaluates candidate answers with scores, 
feedback, and improvement suggestions — built using advanced 
prompt engineering techniques.

## Live Demo
https://soft-bavarois-ed7142.netlify.app

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Groq API (LLaMA 3.3 70B)
- **Deployment:** Netlify + GitHub

## About This Project
This was the first of three AI-powered applications built during 
an intensive 48-hour AI development sprint. The goal was to go 
from studying prompt engineering fundamentals to shipping 
production-ready full stack apps — all within two days.

The app solves a real problem: interview preparation is stressful 
and generic. This tool generates questions tailored to your exact 
role and seniority level, then gives you honest AI feedback on 
every answer — like having a senior engineer interview you on demand.

## What I Built With Prompt Engineering

### Technique 1 — Role and Context Aware Prompting
The question generation prompt is dynamically constructed with 
the user's job role and seniority level. This means a Junior 
Frontend Developer gets completely different questions than a 
Senior Backend Developer — the AI adapts its output based on 
context variables injected into the prompt.

### Technique 2 — Structured JSON Output Enforcement
Both routes enforce strict JSON output through explicit schema 
definition in the prompt. The evaluation route returns a 
structured object with score, feedback, improvements array, and 
example answer — all in one call. This required careful prompt 
design to guarantee consistent shape every time.

### Technique 3 — System Prompt Persona Design
I used a system prompt to establish the AI as a "senior interview 
coach" before processing any user input. This persona definition 
dramatically improves response quality — the AI evaluates answers 
more rigorously and provides more actionable feedback compared to 
no system prompt.

### Technique 4 — Evaluation Rubric Through Prompting
Rather than building a scoring algorithm in code, I engineered 
the evaluation prompt to act as a consistent rubric — always 
returning a score between 0-10, always providing exactly 3-5 
improvements, always including an example answer. The prompt 
IS the rubric.

### Technique 5 — Iterative Prompt Refinement
During development I identified that without explicit instructions, 
the AI would sometimes return generic feedback. I iteratively 
refined the prompt to specify that feedback must be specific to 
the candidate's actual answer — not generic interview advice. 
This is the core skill of prompt engineering: refining prompts 
based on output quality.

### Technique 6 — Handling AI Limitations Gracefully
Implemented JSON parse error handling so that if the AI returns 
malformed output, the app fails gracefully with a clear error 
message rather than crashing — a production prompt engineering 
best practice.

## What I Learned
- How to make AI output role-aware through dynamic prompt construction
- How to use system prompts to establish consistent AI behavior
- How to engineer prompts that act as evaluation rubrics
- How iterative prompt refinement dramatically improves output quality
- How to handle AI output failures gracefully in production

## The Sprint
This app was one of three AI-powered projects built in 48 hours:
1. AI Interview Coach — https://soft-bavarois-ed7142.netlify.app
2. AI Learning Path Generator — https://relaxed-pothos-a9636e.netlify.app
3. AI Regex Generator — https://aesthetic-choux-38c965.netlify.app

## Setup
1. Clone the repo
2. Get a free API key at console.groq.com
3. Create server/.env with GROQ_API_KEY=your_key
4. cd server && npm install && node index.js
5. cd client && npm install && npm start
