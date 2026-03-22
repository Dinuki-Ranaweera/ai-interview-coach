const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { question, answer, role } = JSON.parse(event.body || '{}');

    if (!question || !answer || !role) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
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
    catch { return { statusCode: 500, body: JSON.stringify({ error: 'AI returned invalid JSON' }) }; }

    if (!parsed || typeof parsed.score !== 'number' || typeof parsed.feedback !== 'string' ||
        !Array.isArray(parsed.improvements) || typeof parsed.example_answer !== 'string') {
      return { statusCode: 500, body: JSON.stringify({ error: 'Unexpected response shape' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: parsed.score,
        feedback: parsed.feedback,
        improvements: parsed.improvements,
        example_answer: parsed.example_answer
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to evaluate answer', details: err.message })
    };
  }
};