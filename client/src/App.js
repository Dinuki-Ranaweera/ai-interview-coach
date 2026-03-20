import { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import InterviewScreen from './components/InterviewScreen';
import FeedbackScreen from './components/FeedbackScreen';
import SummaryScreen from './components/SummaryScreen';
import AppHeader from './components/AppHeader';
import { generateQuestions, evaluateAnswer } from './lib/api';

export default function App() {
  const [screen, setScreen] = useState('setup');
  const [role, setRole] = useState('Frontend Developer');
  const [level, setLevel] = useState('Junior');
  const [questions, setQuestions] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const totalQuestions = questions.length;

  const startInterview = async () => {
    setIsLoading(true);
    setError('');
    try {
      const qs = await generateQuestions(role, level);
      setQuestions(qs);
      setEvaluations(Array(qs.length).fill(null));
      setCurrentIndex(0);
      setScreen('interview');
    } catch (e) {
      setError(e?.message || 'Failed to generate questions');
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer) => {
    const question = questions[currentIndex];
    if (!question) return false;
    setIsLoading(true);
    setError('');
    try {
      const evaluation = await evaluateAnswer(question, answer, role);
      setEvaluations((prev) => {
        const next = [...prev];
        next[currentIndex] = evaluation;
        return next;
      });
      setScreen('feedback');
      return true;
    } catch (e) {
      setError(e?.message || 'Failed to evaluate answer');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextFromFeedback = () => {
    if (currentIndex >= totalQuestions - 1) {
      setScreen('summary');
      return;
    }
    setCurrentIndex((i) => i + 1);
    setScreen('interview');
  };

  const startNewInterview = () => {
    setScreen('setup');
    setQuestions([]);
    setEvaluations([]);
    setCurrentIndex(0);
    setRole('Frontend Developer');
    setLevel('Junior');
    setIsLoading(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="px-4 py-6">
        <div className="mx-auto w-full max-w-5xl">
          {screen === 'setup' && (
            <SetupScreen role={role} setRole={setRole} level={level} setLevel={setLevel}
              onStartInterview={startInterview} isLoading={isLoading} error={error} />
          )}
          {screen === 'interview' && (
            <InterviewScreen role={role} question={questions[currentIndex]}
              questionIndex={currentIndex} totalQuestions={totalQuestions}
              onSubmitAnswer={submitAnswer} isLoading={isLoading} error={error} />
          )}
          {screen === 'feedback' && (
            <FeedbackScreen role={role} question={questions[currentIndex]}
              questionIndex={currentIndex} totalQuestions={totalQuestions}
              evaluation={evaluations[currentIndex]} onNext={handleNextFromFeedback}
              isLoading={isLoading} error={error} />
          )}
          {screen === 'summary' && (
            <SummaryScreen role={role} questions={questions}
              evaluations={evaluations} onStartNew={startNewInterview} />
          )}
        </div>
      </div>
    </div>
  );
}