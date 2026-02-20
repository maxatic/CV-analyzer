'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_SIZE = 5 * 1024 * 1024

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) return 'Only PDF and DOCX files are accepted.'
  if (file.size > MAX_SIZE) return 'File must be under 5 MB.'
  return null
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleFile(f: File) {
    const err = validateFile(f)
    if (err) {
      setError(err)
      setFile(null)
      return
    }
    setFile(f)
    setError(null)
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  async function handleSubmit() {
    if (!file || loading) return
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      router.push(`/results/${data.id}`)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Upload your CV</h1>
        <p className="mb-8 text-center text-gray-500">PDF or DOCX · Max 5 MB</p>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-14 text-center transition-colors ${
            dragging
              ? 'border-black bg-gray-100'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={onFileChange}
          />
          {file ? (
            <>
              <div className="text-5xl">📄</div>
              <p className="mt-3 font-semibold text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
              <p className="mt-2 text-xs text-gray-400">Click to replace</p>
            </>
          ) : (
            <>
              <div className="text-5xl">⬆️</div>
              <p className="mt-3 font-semibold text-gray-900">Drag & drop your CV here</p>
              <p className="text-sm text-gray-400">or click to browse</p>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="mt-5 w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Analysing your CV…' : 'Score my CV'}
        </button>

        {loading && (
          <p className="mt-3 text-center text-xs text-gray-400">
            This usually takes 10–20 seconds
          </p>
        )}
      </div>
    </main>
  )
}
