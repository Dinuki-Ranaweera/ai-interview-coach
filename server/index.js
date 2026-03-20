const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate-questions', async (req, res) => {
  try {
    const { role, level } = req.body || {};
    if (!role || !level) {
      return res.status(400).json({
        error: 'Missing required fields: role, level'
      });
    }
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interview coach. Return ONLY valid JSON, no markdown, no code fences, no extra text.'
        },
        {
          role: 'user',
          content: `Generate exactly 5 interview questions for:
Role: ${role}
Level: ${level}
Return this exact JSON schema:
{"questions": ["string","string","string","string","string"]}`
        }
      ],
      temperature: 0.3,
      max_tokens: 900,
    });
    const rawText = completion.choices[0]?.message?.content?.trim();
    let parsed;
    try { parsed = JSON.parse(rawText); }
    catch { return res.status(500).json({ error: 'AI returned invalid JSON', raw: rawText }); }
    if (!parsed || !Array.isArray(parsed.questions)) {
      return res.status(500).json({ error: 'Unexpected response shape' });
    }
    return res.json({ questions: parsed.questions });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to generate questions',
      details: err.message
    });
  }
});

app.post('/api/evaluate-answer', async (req, res) => {
  try {
    const { question, answer, role } = req.body || {};
    if (!question || !answer || !role) {
      return res.status(400).json({
        error: 'Missing required fields: question, answer, role'
      });
    }
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interview evaluator. Return ONLY valid JSON, no markdown, no code fences, no extra text.'
        },
        {
          role: 'user',
          content: `Evaluate this interview answer:
Role: ${role}
Question: ${question}
Answer: ${answer}
Return this exact JSON schema:
{"score":7,"feedback":"string","improvements":["string","string","string"],"example_answer":"string"}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1200,
    });
    const rawText = completion.choices[0]?.message?.content?.trim();
    let parsed;
    try { parsed = JSON.parse(rawText); }
    catch { return res.status(500).json({ error: 'AI returned invalid JSON', raw: rawText }); }
    if (
      !parsed ||
      typeof parsed.score !== 'number' ||
      typeof parsed.feedback !== 'string' ||
      !Array.isArray(parsed.improvements) ||
      typeof parsed.example_answer !== 'string'
    ) {
      return res.status(500).json({ error: 'Unexpected response shape' });
    }
    return res.json({
      score: parsed.score,
      feedback: parsed.feedback,
      improvements: parsed.improvements,
      example_answer: parsed.example_answer,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to evaluate answer',
      details: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});