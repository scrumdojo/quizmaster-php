interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <>
        <br />
        Explanation: <span className="explanationText">{props.text}</span>
    </>
)

export const QuestionExplanation = (props: ExplanationProps) => <p className="question-explanation">{props.text}</p>
