import { type QuizQuestion, type AnswerIdxs, isAnsweredCorrectly } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useEffect, useState } from 'react'
import { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { useParams, useLocation } from 'react-router-dom'
import { BackButton, EvaluateButton, NextButton } from './quiz/buttons'
import { getQuiz } from 'api/quiz'

interface QuizQuestionProps {
    readonly onEvaluate: (quizScore: QuizScore) => void
    readonly quiz: QuizQuestion[]
    readonly isEndFeedbackQuiz: boolean
}

type QuizState = readonly AnswerIdxs[]

export const QuizQuestionForm = (props: QuizQuestionProps) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const currentQuestion = props.quiz[currentQuestionIdx]
    const isLastQuestion = currentQuestionIdx === props.quiz.length - 1

    const [quizState, setQuizState] = useState<QuizState>([])
    const isAnswered = quizState[currentQuestionIdx] !== undefined

    const onSubmitted = (selectedAnswerIdxs: AnswerIdxs) => {
        const newQuizState = Array.from(quizState)
        newQuizState[currentQuestionIdx] = selectedAnswerIdxs
        setQuizState(newQuizState)
    }

    const onNext = () => setCurrentQuestionIdx(prev => prev + 1)
    const onEvaluate = () =>
        props.onEvaluate({
            correct: props.quiz.filter((question, idx) => isAnsweredCorrectly(quizState[idx], question.correctAnswers))
                .length,
            total: props.quiz.length,
            answers: props.quiz.map((question, idx) => ({
                ...question,
                userAnswers: quizState[idx],
                feedback: isAnsweredCorrectly(quizState[idx], question.correctAnswers) ? 'Correct' : 'Incorrect',
            })),
        })

    const handlePreviousClick = () => setCurrentQuestionIdx(prev => prev - 1)

    if (props.quiz.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Quiz</h2>
            <ProgressBar current={currentQuestionIdx + 1} total={props.quiz.length} />
            <QuestionForm key={currentQuestion.id} question={currentQuestion} onSubmitted={onSubmitted} />
            {currentQuestionIdx > 0 && <BackButton onClick={handlePreviousClick} />}
            {isAnswered &&
                (!isLastQuestion ? <NextButton onClick={onNext} /> : <EvaluateButton onClick={onEvaluate} />)}
        </div>
    )
}

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
        <QuizScore score={quizScore} answers={quizScore?.answers} />
    ) : (
        <QuizQuestionForm onEvaluate={setQuizScore} quiz={quiz} isEndFeedbackQuiz={isEndFeedback} />
    )
}
