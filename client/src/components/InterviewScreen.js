import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function InterviewScreen({ role, question, questionIndex, totalQuestions, onSubmitAnswer, isLoading, error }) {
  const [answer, setAnswer] = useState('');
  const maxChars = 2000;
  const progressPercent = totalQuestions > 0 ? ((questionIndex + 1) / totalQuestions) * 100 : 0;
  const canSubmit = answer.trim().length > 0 && !isLoading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const ok = await onSubmitAnswer(answer);
    if (ok) setAnswer('');
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-blue-100/60">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Question {questionIndex + 1} of {totalQuestions}</h2>
            <div className="mt-1 text-sm text-gray-500">Role: {role}</div>
          </div>
          <div className="w-full sm:w-72">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
              <span>{questionIndex + 1}/{totalQuestions}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 ring-1 ring-blue-100">
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${progressPercent}%` }}/>
            </div>
          </div>
        </div>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}
        <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div className="text-sm font-medium text-blue-900/80">Question</div>
          <div className="mt-2 text-gray-900">{question}</div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm font-medium text-gray-800">Your answer</label>
            <div className="text-xs text-gray-500">{answer.length}/{maxChars}</div>
          </div>
          <textarea maxLength={maxChars}
            className="mt-2 min-h-[160px] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={answer} onChange={(e) => setAnswer(e.target.value.slice(0, maxChars))}
            placeholder="Type your response here..."/>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" onClick={handleSubmit} disabled={!canSubmit}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? <LoadingSpinner label="Evaluating..." /> : 'Submit Answer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}