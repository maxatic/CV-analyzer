import Anthropic from '@anthropic-ai/sdk'
import { CvResult } from '@/types/cv-result'

const client = new Anthropic()

const SYSTEM_PROMPT = `You are an expert CV reviewer with 15 years of experience in recruitment and career coaching. Your task is to analyze a CV and return a structured evaluation.

Return ONLY a valid JSON object with this exact structure — no markdown, no explanation, just the JSON:
{
  "overall_score": <number 1-10, weighted average of dimension scores>,
  "scores": {
    "clarity": <number 1-10>,
    "experience": <number 1-10>,
    "skills": <number 1-10>,
    "education": <number 1-10>,
    "summary": <number 1-10>,
    "achievements": <number 1-10>,
    "ats": <number 1-10>
  },
  "feedback": {
    "clarity": "<2-3 sentence explanation>",
    "experience": "<2-3 sentence explanation>",
    "skills": "<2-3 sentence explanation>",
    "education": "<2-3 sentence explanation>",
    "summary": "<2-3 sentence explanation>",
    "achievements": "<2-3 sentence explanation>",
    "ats": "<2-3 sentence explanation>"
  },
  "top_strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "top_improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "one_line_verdict": "<one punchy sentence summarising the CV>"
}

Scoring weights for overall_score:
- clarity: 20%
- experience: 25%
- skills: 15%
- education: 10%
- summary: 10%
- achievements: 15%
- ats: 5%

Be honest, specific, and constructive.`

export async function scoreCv(cvText: string): Promise<CvResult> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Analyze this CV:\n\n${cvText}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  // Strip markdown code fences if present
  const raw = content.text.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '')

  const result = JSON.parse(raw) as CvResult
  return result
}
