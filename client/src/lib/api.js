const API_BASE = '';

export async function generateQuestions(role, level) {
  const res = await fetch(`${API_BASE}/api/generate-questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, level }),
  });
  if (!res.ok) {
    let details = '';
    try {
      const errJson = await res.json();
      details = errJson?.error ? String(errJson.error) : '';
    } catch { details = ''; }
    throw new Error(details || `Failed to generate questions (${res.status})`);
  }
  const data = await res.json();
  const questions = Array.isArray(data?.questions) ? data.questions : [];
  if (questions.length !== 5) throw new Error('AI did not return exactly 5 questions.');
  return questions;
}

export async function evaluateAnswer(question, answer, role) {
  const res = await fetch(`${API_BASE}/api/evaluate-answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, answer, role }),
  });
  if (!res.ok) {
    let details = '';
    try {
      const errJson = await res.json();
      details = errJson?.error ? String(errJson.error) : '';
    } catch { details = ''; }
    throw new Error(details || `Failed to evaluate answer (${res.status})`);
  }
  const data = await res.json();
  return {
    score: data?.score,
    feedback: data?.feedback,
    improvements: Array.isArray(data?.improvements) ? data.improvements : [],
    example_answer: data?.example_answer,
  };
}