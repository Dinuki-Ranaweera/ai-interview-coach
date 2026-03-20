export default function SummaryScreen({ role, questions, evaluations, onStartNew }) {
    const scores = evaluations.map((e) => e?.score).filter((s) => typeof s === 'number');
    const average = scores.length > 0 ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0;
    const avgRounded = Math.round(average);
    const tone = scores.length === 0
      ? { label: '—', bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' }
      : avgRounded >= 8
      ? { label: 'Excellent', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' }
      : avgRounded >= 5
      ? { label: 'Good', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' }
      : { label: 'Needs Practice', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
  
    return (
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow ring-1 ring-blue-100/60">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Interview Summary</h2>
          <div className="mt-1 text-sm text-gray-600">Role: {role}</div>
        </div>
        <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800">Overall Average</div>
              <div className="mt-1 text-4xl font-semibold text-blue-700">
                {scores.length ? average.toFixed(1) : '0.0'} / 10
              </div>
            </div>
            <div className={`rounded-xl border ${tone.border} ${tone.bg} ${tone.text} px-4 py-2 text-sm font-semibold`}>
              {tone.label}
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            {tone.label === 'Excellent' ? 'Great job communicating clearly and effectively.'
              : tone.label === 'Good' ? 'Solid answers. Tighten structure and add more examples.'
              : 'Focus on clarity, depth, and specific outcomes. Try again for improvement.'}
          </div>
        </div>
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const score = evaluations[idx]?.score;
            const cardTone = typeof score !== 'number'
              ? { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' }
              : score >= 8
              ? { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' }
              : score >= 5
              ? { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' }
              : { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
            return (
              <div key={idx} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm text-gray-500">Question {idx + 1}</div>
                    <div className="mt-1 text-sm font-semibold text-gray-900">{q}</div>
                  </div>
                  <div className={`rounded-xl border ${cardTone.border} ${cardTone.bg} ${cardTone.text} px-4 py-2`}>
                    <div className="text-xs font-medium">Score</div>
                    <div className="mt-1 text-2xl font-semibold">{typeof score === 'number' ? score : '--'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <button type="button" onClick={onStartNew}
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
            Start New Interview
          </button>
        </div>
      </div>
    );
  }