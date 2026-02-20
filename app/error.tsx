'use client'

import { AlertCircle } from 'lucide-react'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-gray-500">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Try again
      </button>
    </main>
  )
}
