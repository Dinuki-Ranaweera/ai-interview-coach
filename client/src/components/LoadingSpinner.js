export default function LoadingSpinner({ label = 'Thinking...' }) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-3 py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" aria-label="Loading"/>
        <div className="text-sm font-medium text-gray-700">
          <span className="animate-pulse">{label}</span>
        </div>
      </div>
    );
  }