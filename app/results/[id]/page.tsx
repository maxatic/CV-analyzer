import type { Metadata } from 'next'
import { getResult } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CvScores, CvFeedback } from '@/types/cv-result'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const result = await getResult(id)
  if (!result) return { title: 'Not Found – CV Scorer' }
  return {
    title: `Score: ${result.overall_score.toFixed(1)}/10 – CV Scorer`,
    description: result.one_line_verdict,
  }
}

const DIMENSIONS: { key: keyof CvScores; label: string; weight: number }[] = [
  { key: 'experience', label: 'Work Experience', weight: 25 },
  { key: 'clarity', label: 'Clarity & Formatting', weight: 20 },
  { key: 'achievements', label: 'Quantified Achievements', weight: 15 },
  { key: 'skills', label: 'Skills', weight: 15 },
  { key: 'summary', label: 'Summary / Objective', weight: 10 },
  { key: 'education', label: 'Education', weight: 10 },
  { key: 'ats', label: 'ATS Friendliness', weight: 5 },
]

function scoreColor(score: number) {
  if (score >= 8) return 'text-green-600'
  if (score >= 5) return 'text-amber-500'
  return 'text-red-500'
}

function scoreBg(score: number) {
  if (score >= 8) return 'bg-green-500'
  if (score >= 5) return 'bg-amber-500'
  return 'bg-red-500'
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getResult(id)
  if (!result) notFound()

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Overall score */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Overall Score
          </p>
          <p className={`mt-1 text-8xl font-bold ${scoreColor(result.overall_score)}`}>
            {result.overall_score.toFixed(1)}
          </p>
          <p className="text-sm text-gray-400">out of 10</p>
          <p className="mt-4 text-base text-gray-600 italic">"{result.one_line_verdict}"</p>
        </div>

        {/* Dimension breakdown */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Score Breakdown</h2>
          <div className="space-y-5">
            {DIMENSIONS.map((d) => {
              const score = result.scores[d.key]
              return (
                <div key={d.key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {d.label}
                      <span className="ml-1 text-xs font-normal text-gray-400">({d.weight}%)</span>
                    </span>
                    <span className={`font-bold ${scoreColor(score)}`}>{score}/10</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${scoreBg(score)}`}
                      style={{ width: `${score * 10}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Strengths & improvements */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-green-50 p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-green-900">Top Strengths</h2>
            <ul className="space-y-2">
              {result.top_strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-green-800">
                  <span className="mt-0.5 shrink-0">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-amber-50 p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-amber-900">Top Improvements</h2>
            <ul className="space-y-2">
              {result.top_improvements.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-800">
                  <span className="mt-0.5 shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed feedback */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Detailed Feedback</h2>
          <div className="space-y-6">
            {DIMENSIONS.map((d, i) => {
              const score = result.scores[d.key]
              const feedback = result.feedback[d.key as keyof CvFeedback]
              return (
                <div key={d.key}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{d.label}</h3>
                    <span className={`text-sm font-bold ${scoreColor(score)}`}>{score}/10</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{feedback}</p>
                  {i < DIMENSIONS.length - 1 && (
                    <div className="mt-6 border-t border-gray-100" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col items-center gap-3 pb-4">
          <p className="text-xs text-gray-400">
            This page has a unique URL — bookmark or share it anytime.
          </p>
          <Link
            href="/upload"
            className="rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Score another CV
          </Link>
        </div>

      </div>
    </main>
  )
}
