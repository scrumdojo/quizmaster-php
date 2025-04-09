import type { QuizQuestion } from 'model/quiz-question.ts'
import { fetchJson } from './helpers.ts'

export const getQuiz = async (quizId: string) => await fetchJson<QuizQuestion[]>(`/api/quiz/${quizId}`)
