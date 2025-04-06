import './correctness.css'

interface AnswerCorrectnessProps {
    readonly isCorrect: boolean
}

export const AnswerCorrectness = (props: AnswerCorrectnessProps) => {
    const evaluation = props.isCorrect ? '' : '\u274C'
    const individualFeedback = props.isCorrect ? '' : 'Incorrect!'

    const className = props.isCorrect ? '' : 'incorrect'

    return (
        <span>
            {evaluation} <span className={`feedback ${className}`}>{individualFeedback}</span>
        </span>
    )
}
