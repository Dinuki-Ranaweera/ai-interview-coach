import LoadingSpinner from './LoadingSpinner';

export default function FeedbackScreen({ role, question, questionIndex, totalQuestions, evaluation, onNext, isLoading, error }) {
  const score = typeof evaluation?.score === 'number' ? evaluation.score : null;
  const scoreTone = score === null
    ? { label: '—', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
    : score >= 8
    ? { label: 'Excellent', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    : score >= 5
    ? { label: 'Good', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' }
    : { label: 'Needs Practice', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow">
        <LoadingSpinner label="Loading feedback..." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow ring-1 ring-blue-100/60">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Feedback</h2>
        <div className="mt-1 text-sm text-gray-500">Role: {role} · Question {questionIndex + 1} of {totalQuestions}</div>
      </div>
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
          <div className="text-sm font-medium text-blue-900/80">Question</div>
          <div className="mt-2 text-sm font-medium text-gray-900">{question}</div>
        </div>
        <div className={`rounded-xl border ${scoreTone.border} ${scoreTone.bg} p-4`}>
          <div className="text-sm font-medium text-gray-800">Score</div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className={`text-4xl font-semibold ${scoreTone.text}`}>{score === null ? '--' : score}</div>
            <div className={`text-sm font-semibold ${scoreTone.text}`}>/ 10</div>
          </div>
          <div className={`mt-1 text-xs font-medium ${scoreTone.text}`}>{scoreTone.label}</div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="text-sm font-medium text-gray-800">Feedback</div>
        <div className="mt-2 whitespace-pre-wrap text-sm text-gray-800">{evaluation?.feedback || ''}</div>
      </div>
      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-gray-800">Improvements</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(evaluation?.improvements || []).map((item, idx) => (
            <div key={idx} className="rounded-xl border border-blue-100 bg-blue-50/30 p-3 text-sm text-gray-800">{item}</div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/30 p-4">
        <div className="mb-2 text-sm font-medium text-blue-900/80">Example Answer</div>
        <div className="whitespace-pre-wrap text-sm text-gray-900">{evaluation?.example_answer || ''}</div>
      </div>
      <button type="button" onClick={onNext}
        className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
        Next Question
      </button>
    </div>
  );
}