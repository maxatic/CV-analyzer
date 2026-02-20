import Link from 'next/link'

const DIMENSIONS = [
  { label: 'Work Experience', weight: 25 },
  { label: 'Clarity & Formatting', weight: 20 },
  { label: 'Quantified Achievements', weight: 15 },
  { label: 'Skills', weight: 15 },
  { label: 'Summary / Objective', weight: 10 },
  { label: 'Education', weight: 10 },
  { label: 'ATS Friendliness', weight: 5 },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-28 text-center">
        <span className="mb-4 rounded-full bg-gray-100 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gray-500">
          AI-powered
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Get your CV scored<br />in seconds
        </h1>
        <p className="mt-6 max-w-lg text-lg text-gray-500">
          Upload your CV and receive instant, honest feedback across 7 key dimensions.
          No sign-up. No fluff. Just results.
        </p>
        <Link
          href="/upload"
          className="mt-10 rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Score my CV →
        </Link>
        <p className="mt-3 text-xs text-gray-400">PDF or DOCX · Max 5 MB · Free</p>
      </section>

      {/* Dimensions grid */}
      <section className="border-t bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-semibold text-gray-900">What we analyse</h2>
          <p className="mb-10 text-center text-sm text-gray-500">
            Each dimension is weighted to produce a final score out of 10
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {DIMENSIONS.map((d) => (
              <div key={d.label} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold text-gray-400">{d.weight}%</div>
                <div className="mt-1 text-sm font-medium text-gray-800">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
