import type { QuizQuestion } from 'model/quiz-question.ts'
import { fetchJson, postJson } from './helpers.ts'
import type { QuizCreateResponse } from 'model/quiz-create-response.ts'

export const getQuiz = async (quizId: string) => await fetchJson<QuizQuestion[]>(`/api/quiz/${quizId}`)

export type QuizApiData = Omit<QuizQuestion, 'id'>

export const saveQuiz = async (quiz: QuizApiData) => await postJson<QuizApiData, QuizCreateResponse>('/api/quiz', quiz)
