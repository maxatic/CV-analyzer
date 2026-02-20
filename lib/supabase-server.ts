import { createClient } from '@supabase/supabase-js'
import { CvResult } from '@/types/cv-result'

export async function getResult(id: string): Promise<CvResult | null> {
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('results')
    .select('result')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return data.result as CvResult
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase credentials')
  return createClient(url, key)
}

export async function uploadCvToStorage(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const supabase = getSupabaseAdmin()
  const uniqueName = `${Date.now()}-${fileName}`

  const { error } = await supabase.storage
    .from('cvs')
    .upload(uniqueName, buffer, { contentType: mimeType })

  if (error) throw error

  return uniqueName
}

export async function saveResult(result: CvResult, filePath: string): Promise<string> {
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('results')
    .insert({ result, file_path: filePath })
    .select('id')
    .single()

  if (error) throw error

  return data.id as string
}
