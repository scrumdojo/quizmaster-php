import { type QuizQuestion, type AnswerIdxs, isAnsweredCorrectly } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'
import type { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { EvaluateButton, NextButton, BackButton } from './quiz/buttons'

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
        if (props.isEndFeedbackQuiz) {
            onNext()
        }
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
            <QuestionForm
                key={currentQuestion.id}
                question={currentQuestion}
                onSubmitted={onSubmitted}
                isEndFeedbackQuiz={props.isEndFeedbackQuiz}
                answers={quizState[currentQuestionIdx]}
            />
            {currentQuestionIdx > 0 && <BackButton onClick={handlePreviousClick} />}
            {isAnswered &&
                (!isLastQuestion ? <NextButton onClick={onNext} /> : <EvaluateButton onClick={onEvaluate} />)}
        </div>
    )
}
