import type React from 'react'

import { AnswerFeedback } from 'pages/question-take'
import { Checkbox, Radio } from '@mui/material'

export type AnswerProps = {
    readonly isMultipleChoice: boolean
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly showFeedback: boolean
    readonly onAnswerChange: (idx: number, selected: boolean) => void
    checked?: boolean
}

export const Answer = (props: AnswerProps) => {
    const answerId = `answer-row-${props.idx}`
    const AnswerInput = props.isMultipleChoice ? Checkbox : Radio
    const checkName = props.isMultipleChoice ? answerId : 'answer'
    let listItemClassName = 'listItemClassName'
    if (props.showFeedback) {
        listItemClassName = props.isCorrect ? 'success' : 'error'
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onAnswerChange(props.idx, event.target.checked)
    }

    return (
        <li data-test-id={`answer-row-${props.answer}`} key={props.idx} className={listItemClassName}>
            <AnswerInput
                value={props.answer}
                checked={props.checked}
                id={answerId}
                onChange={onChange}
                name={checkName}
            />
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
