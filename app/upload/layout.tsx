import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload – CV Scorer',
  description: 'Upload your CV to get an instant AI-powered score with detailed feedback.',
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
