import { RadioGroup } from '@mui/material'
import type { AnswerIdxs, QuizQuestion } from 'model/quiz-question.ts'
import {
    Answer,
    useQuestionFeedbackState,
    useQuestionTakeState,
    QuestionCorrectness,
    QuestionExplanation,
} from 'pages/question-take'
import { SubmitAndNextButton } from 'pages/quiz/buttons'
import { Fragment } from 'react'

export interface QuestionFormProps {
    readonly question: QuizQuestion
    readonly onSubmitted?: (selectedAnswerIdxs: AnswerIdxs) => void
    readonly isEndFeedbackQuiz?: boolean
    readonly answers?: AnswerIdxs
}

export const QuestionForm = (props: QuestionFormProps) => {
    const state = useQuestionTakeState(props)
    const feedback = useQuestionFeedbackState(state, props.question)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state.selectedAnswerIdxs.length > 0) {
            state.submit()
            props.onSubmitted?.(state.selectedAnswerIdxs)
        }
    }

    const Group = state.isMultipleChoice ? Fragment : RadioGroup

    const selectedValue = props.answers?.map(answerIndex => props.question.answers[answerIndex])
    const isSubmitted = props.answers !== undefined || state.submitted

    return (
        <form onSubmit={handleSubmit} id="question-form">
            <h1>{props.question.question}</h1>
            <Group name="answer" data-test-id="question-form" defaultValue={selectedValue}>
                <ul className="answer-list">
                    {props.question.answers.map((answer, idx) => (
                        <Answer
                            key={answer}
                            isMultipleChoice={state.isMultipleChoice}
                            idx={idx}
                            answer={answer}
                            isCorrect={feedback.isAnswerCorrect(idx)}
                            explanation={props.question.explanations ? props.question.explanations[idx] : 'not defined'}
                            showFeedback={isSubmitted && feedback.showFeedback(idx)}
                            onAnswerChange={state.onSelectedAnswerChange}
                            selected={props.answers?.includes(idx)}
                            disabled={isSubmitted}
                        />
                    ))}
                </ul>
            </Group>
            {!isSubmitted &&
                (props.isEndFeedbackQuiz ? (
                    <SubmitAndNextButton />
                ) : (
                    <input type="submit" value="Submit" className="submit-btn" id="submit-button" />
                ))}
            {isSubmitted && <QuestionCorrectness isCorrect={feedback.isQuestionCorrect} />}
            {isSubmitted && <QuestionExplanation text={props.question.questionExplanation} />}
        </form>
    )
}
