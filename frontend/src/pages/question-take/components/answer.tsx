import type React from 'react'

import { AnswerFeedback } from 'pages/question-take'

export type AnswerProps = {
    readonly isMultipleChoice: boolean
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly showFeedback: boolean
    readonly onAnswerChange: (idx: number, selected: boolean) => void
}

export const Answer = (props: AnswerProps) => {
    const answerId = `answer-row-${props.idx}`
    const checkType = props.isMultipleChoice ? 'checkbox' : 'radio'
    const checkName = props.isMultipleChoice ? answerId : 'answer'

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onAnswerChange(props.idx, event.target.checked)
    }

    return (
        <li data-test-id={`answer-row-${props.answer}`} key={props.idx}>
            <input type={checkType} name={checkName} id={answerId} value={props.answer} onChange={onChange} />
            <label htmlFor={answerId}>
                {props.answer}
                {props.showFeedback && (
                    <AnswerFeedback
                        correct={props.isCorrect}
                        explanation={props.explanation}
                        isMultipleChoice={props.isMultipleChoice}
                    />
                )}
            </label>
            <br />
            <br />
        </li>
    )
}
