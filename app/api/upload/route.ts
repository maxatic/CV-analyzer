import { NextRequest, NextResponse } from 'next/server'
import { extractText } from '@/lib/extract-text'
import { scoreCv } from '@/lib/score-cv'
import { uploadCvToStorage, saveResult } from '@/lib/supabase-server'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and DOCX files are accepted.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5 MB.' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Extract text from PDF or DOCX
    let text: string
    try {
      text = await extractText(buffer, file.type)
    } catch (err) {
      console.error('[extract-text error]', err)
      return NextResponse.json(
        { error: 'Failed to extract text from the file. It may be corrupted or password-protected.' },
        { status: 422 }
      )
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'The file appears to be empty or contains too little text to analyse.' },
        { status: 422 }
      )
    }

    // Score the CV and upload file in parallel
    let result
    let filePath: string
    try {
      [result, filePath] = await Promise.all([
        scoreCv(text),
        uploadCvToStorage(buffer, file.name, file.type),
      ])
    } catch (err) {
      console.error('[score-cv/upload error]', err)
      return NextResponse.json(
        { error: 'Failed to analyse the CV. Please try again.' },
        { status: 502 }
      )
    }

    // Persist result
    const id = await saveResult(result, filePath)

    return NextResponse.json({ id, result })
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
