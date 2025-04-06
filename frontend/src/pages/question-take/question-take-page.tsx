import './question-take-page.scss'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { QuizQuestion } from 'model/quiz-question.ts'
import { getQuestion } from 'api/quiz-question.ts'
import { QuestionForm } from 'pages/question-take'

export const QuestionTakePage = () => {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined

    const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null)

    useEffect(() => {
        const fetchQuestion = async () => {
            if (questionId) {
                const question = await getQuestion(questionId)
                setQuizQuestion(question)
            }
        }
        fetchQuestion()
    }, [questionId])

    return quizQuestion ? <QuestionForm question={quizQuestion} /> : null
}
