import type { AnswerIdxs, QuizQuestion } from 'model/quiz-question.ts'
import {
    Answer,
    useQuestionFeedbackState,
    useQuestionTakeState,
    QuestionCorrectness,
    QuestionExplanation,
} from 'pages/question-take'

export interface QuestionFormProps {
    readonly question: QuizQuestion
    readonly onSubmitted?: (selectedAnswerIdxs: AnswerIdxs) => void
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
    return (
        <form onSubmit={handleSubmit} id="question-form">
            <h1>{props.question.question}</h1>
            <ul>
                {props.question.answers.map((answer, idx) => (
                    <Answer
                        key={answer}
                        isMultipleChoice={state.isMultipleChoice}
                        idx={idx}
                        answer={answer}
                        isCorrect={feedback.isAnswerCorrect(idx)}
                        explanation={props.question.explanations ? props.question.explanations[idx] : 'not defined'}
                        showFeedback={state.submitted && feedback.showFeedback(idx)}
                        onAnswerChange={state.onSelectedAnswerChange}
                    />
                ))}
            </ul>
            {!state.submitted && <input type="submit" value="Submit" className="submit-btn" />}
            {state.submitted && <QuestionCorrectness isCorrect={feedback.isQuestionCorrect} />}
            {state.submitted && <QuestionExplanation text={props.question.questionExplanation} />}
        </form>
    )
}
