export default function ResultsLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Overall score */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-2 h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto mt-2 h-20 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto mt-2 h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto mt-5 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Dimension breakdown */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />
          <div className="space-y-5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="mt-2 h-2 w-full animate-pulse rounded-full bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & improvements */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-green-50 p-6 shadow-sm">
            <div className="mb-4 h-5 w-28 animate-pulse rounded bg-green-200" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 w-full animate-pulse rounded bg-green-200" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-amber-50 p-6 shadow-sm">
            <div className="mb-4 h-5 w-36 animate-pulse rounded bg-amber-200" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 w-full animate-pulse rounded bg-amber-200" />
              ))}
            </div>
          </div>
        </div>

        {/* Detailed feedback */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 h-5 w-40 animate-pulse rounded bg-gray-200" />
          <div className="space-y-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="mt-2 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
                {i < 6 && <div className="mt-6 border-t border-gray-100" />}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
