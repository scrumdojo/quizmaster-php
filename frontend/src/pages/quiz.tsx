import type { QuizQuestion } from 'model/quiz-question'
import { useState } from 'react'
import { QuizScore } from './quiz-score'
import { useParams, useLocation } from 'react-router-dom'
import { QuizQuestionForm } from './quiz-question-form'

const quizQuestion1: QuizQuestion = {
    id: 1,
    question: 'What is the standard colour of sky?',
    answers: ['Red', 'Blue', 'Green', 'Black'],
    explanations: [],
    questionExplanation: '',
    correctAnswers: [1],
}
const quizQuestion2: QuizQuestion = {
    id: 2,
    question: 'What is capital of France?',
    answers: ['Marseille', 'Lyon', 'Paris', 'Toulouse'],
    explanations: [],
    questionExplanation: '',
    correctAnswers: [2],
}
const quizQuestion3: QuizQuestion = {
    id: 3,
    question: 'What are cities in France?',
    answers: ['London', 'Lyon', 'Paris', 'Toulouse'],
    explanations: [],
    questionExplanation: '',
    correctAnswers: [1, 2, 3],
}

const quizX = [quizQuestion1, quizQuestion2, quizQuestion3]
const quizY = [quizQuestion2, quizQuestion1]

const quizzes: Record<string, QuizQuestion[]> = {
    X: quizX,
    Y: quizY,
}

export const Quiz = () => {
    const [quizScore, setQuizScore] = useState<QuizScore | null>(null)
    const isEvaluated = quizScore !== null
    const params = useParams()
    const queryParams = new URLSearchParams(useLocation().search)
    const isEndFeedback = Boolean(queryParams.get('endfeedback') === '1')
    const quizId = params.id ? params.id.toUpperCase() : 'X'
    return isEvaluated ? (
        <QuizScore score={quizScore} answers={quizScore?.answers} />
    ) : (
        <QuizQuestionForm onEvaluate={setQuizScore} quiz={quizzes[quizId]} isEndFeedbackQuiz={isEndFeedback} />
    )
}
