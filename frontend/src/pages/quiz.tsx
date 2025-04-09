import type { QuizQuestion } from 'model/quiz-question'
import { useEffect, useState } from 'react'
import { QuizScore } from './quiz-score'
import { useParams, useLocation } from 'react-router-dom'
import { getQuiz } from 'api/quiz'
import { QuizQuestionForm } from './quiz-question-form'

export const Quiz = () => {
    const [quizScore, setQuizScore] = useState<QuizScore | null>(null)
    const isEvaluated = quizScore !== null
    const [quiz, setQuiz] = useState<QuizQuestion[]>([])
    const params = useParams()
    const queryParams = new URLSearchParams(useLocation().search)
    const isEndFeedback = Boolean(queryParams.get('endfeedback') === '1')
    const quizId = params.id ? params.id.toUpperCase() : 'X'

    useEffect(() => {
        const fetchQuiz = async () => {
            const fetchedQuiz = await getQuiz(quizId)
            setQuiz(fetchedQuiz)
        }

        fetchQuiz()
    }, [quizId])

    return isEvaluated ? (
        <QuizScore score={quizScore} quizQuestionAnswered={quizScore?.answers} />
    ) : (
        <QuizQuestionForm onEvaluate={setQuizScore} quiz={quiz} isEndFeedbackQuiz={isEndFeedback} />
    )
}
