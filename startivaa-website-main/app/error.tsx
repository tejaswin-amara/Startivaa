"use client";
import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Global error boundary for the application.
 * It captures unhandled errors, logs them (placeholder), and displays a friendly UI.
 */
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  // Log the error – replace with real logging service as needed.
  useEffect(() => {
    console.error('Unhandled error:', error);
    // TODO: send error details to monitoring service.
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-white p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 violet-gradient opacity-30 pointer-events-none" />
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="mb-6 text-center max-w-md">
        An unexpected error has occurred. Our team has been notified.
      </p>
      <button
        onClick={() => {
          reset();
        }}
        className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-md transition"
      >
        Try Again
      </button>
      <Link href="/" className="mt-4 underline hover:text-violet-300">
        Return Home
      </Link>
    </div>
  );
}
