import { type QuizQuestion, type AnswerIdxs, isAnsweredCorrectly } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'
import { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { useParams } from 'react-router-dom'
import { BackButton, EvaluateButton, NextButton } from './quiz/buttons'

interface QuizQuestionProps {
    readonly onEvaluate: (quizScore: QuizScore) => void
    readonly quiz: QuizQuestion[]
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
    const quizId = params.id ? params.id.toUpperCase() : 'X'

    return isEvaluated ? (
        <QuizScore score={quizScore} answers={quizScore?.answers} />
    ) : (
        <QuizQuestionForm onEvaluate={setQuizScore} quiz={quizzes[quizId]} />
    )
}
