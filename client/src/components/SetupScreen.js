import LoadingSpinner from './LoadingSpinner';

export default function SetupScreen({ role, setRole, level, setLevel, onStartInterview, isLoading, error }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-5 rounded-2xl bg-gradient-to-r from-blue-600/10 to-blue-500/10 p-8 ring-1 ring-blue-200/70">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Practice with AI</h1>
          <p className="mt-2 text-sm text-gray-600">
            Pick a role and level, then get five targeted interview questions and feedback tailored to your answers.
          </p>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-blue-100/60">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">Job Role</label>
            <select className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">Level</label>
            <select className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <button type="button" onClick={onStartInterview} disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {isLoading ? <LoadingSpinner label="Generating questions..." /> : 'Start Interview'}
          </button>
          <div className="rounded-xl bg-blue-50 p-3 text-xs text-blue-900">
            You will receive 5 questions and structured evaluation for each answer.
          </div>
        </div>
      </div>
    </div>
  );
}