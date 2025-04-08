import { Correctness, Explanation } from 'pages/question-take'

interface AnswerFeedbackProps {
    readonly correct: boolean
    readonly explanation: string
    readonly isMultipleChoice: boolean
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => (
    <span>
        &nbsp;
        {props.isMultipleChoice ? '' : (
            <Correctness isCorrect={props.correct} />
        )}
        &nbsp;
        <span className="explanation">{<Explanation text={props.explanation} />}</span>
    </span>
)
