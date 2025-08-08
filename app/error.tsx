'use client';

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void
}) {
  return (
    <div className="p-4 border bg-red-100 rounded">
      <h2 className="text-lg font-semibold text-red-700">Error loading component</h2>
      <p>{error.message}</p>
      <button onClick={reset} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Retry
      </button>
    </div>
  );
}