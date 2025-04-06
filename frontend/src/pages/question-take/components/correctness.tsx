import './correctness.css'

interface CorrectnessProps {
    readonly isCorrect: boolean
}

export const Correctness = (props: CorrectnessProps) => {
    const label = props.isCorrect ? 'Correct!' : 'Incorrect!'
    const className = props.isCorrect ? 'correct' : 'incorrect'

    return <span className={`feedback ${className}`}>{label}</span>
}

export const QuestionCorrectness = (props: CorrectnessProps) => (
    <p className="question-correctness">
        The answer is:&nbsp;
        <Correctness isCorrect={props.isCorrect} />
    </p>
)
