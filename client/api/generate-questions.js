const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { role, level } = JSON.parse(event.body || '{}');

    if (!role || !level) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: role, level' })
      };
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
    catch { return { statusCode: 500, body: JSON.stringify({ error: 'AI returned invalid JSON' }) }; }

    if (!parsed || !Array.isArray(parsed.questions)) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Unexpected response shape' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions: parsed.questions })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate questions', details: err.message })
    };
  }
};