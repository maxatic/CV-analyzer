import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <FileQuestion className="h-12 w-12 text-gray-400" />
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 text-sm text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Go home
      </Link>
    </main>
  )
}
