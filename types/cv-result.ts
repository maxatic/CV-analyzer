export interface CvScores {
  clarity: number
  experience: number
  skills: number
  education: number
  summary: number
  achievements: number
  ats: number
}

export interface CvFeedback {
  clarity: string
  experience: string
  skills: string
  education: string
  summary: string
  achievements: string
  ats: string
}

export interface CvResult {
  overall_score: number
  scores: CvScores
  feedback: CvFeedback
  top_strengths: string[]
  top_improvements: string[]
  one_line_verdict: string
}
