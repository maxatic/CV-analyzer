import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'

const PDF_MIME = 'application/pdf'
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export async function extractText(buffer: Buffer, mimeType: string): Promise<string> {
  if (mimeType === PDF_MIME) {
    const data = await pdfParse(buffer)
    return data.text
  }

  if (mimeType === DOCX_MIME) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  throw new Error(`Unsupported file type: ${mimeType}`)
}
