'use client'

import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ResultsError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Failed to load results</h1>
      <p className="mt-2 text-sm text-gray-500">
        We couldn't load your CV results. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Try again
        </button>
        <Link
          href="/upload"
          className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Upload new CV
        </Link>
      </div>
    </main>
  )
}
